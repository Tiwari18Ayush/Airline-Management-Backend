
const axios = require('axios');
const { StatusCodes } = require('http-status-codes');
const{sendData}=require('../config/queue-config');
const { BookingRepository } = require('../repositories');
// const { ServerConfig } = require('../../config');
const db = require('../models');
const AppError = require('../utils/Errors/app-error');

const bookingRepository = new BookingRepository();

async function create(data){
  const transaction=await db.sequelize.transaction();
  try{
     const Idempotency_key=data.Idempotency_key;
     const existingBooking= await bookingRepository.findBooking(Idempotency_key);
     if(existingBooking){
      return existingBooking;
     }
     const flightDetails=await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);
     const flightData=flightDetails.data.data;
      if(flightData.totalSeats < data.noOfSeats){
        throw new AppError('Seats are not available',StatusCodes.BAD_REQUEST);
      }
      const totalCost=flightData.price * data.noOfSeats;
      const bookingPayload={...data,totalCost, Idempotency_key: Idempotency_key };
      const booking=await bookingRepository.create(bookingPayload,transaction);
      await axios.patch(`http://localhost:3000/api/v1/flights/${data.flightId}/seats`,{
        Seats: Number(data.noOfSeats),dec:true
      });
      await transaction.commit();
      return booking;
  }
  catch(error){
  //   console.log("❌ ERROR MESSAGE:", error.message);
  // console.log("❌ ERROR RESPONSE:", error.response?.data);
  // console.log("❌ ERROR STATUS:", error.response?.status);
    await transaction.rollback();
    throw error;
  }
}
  async function makePayment(data){
    const transaction=await db.sequelize.transaction();
    try{
      //dummy payment gateway
      const bookingDetails=await bookingRepository.get(data.bookingId,transaction);
      if(bookingDetails.status==='CANCELLED'){
        throw new AppError('Payment Failed: Booking is cancelled',StatusCodes.BAD_REQUEST);
      }
      console.log(bookingDetails);
      const bookingTime=new Date(bookingDetails.createdAt);
      const currentTime=new Date();
      const timeDiff=(currentTime - bookingTime)/1000/60; //in minutes
      if(timeDiff > 10){
        //cancel the booking
        await transaction.rollback();
        cancelBooking({bookingId:data.bookingId});
        throw new AppError('Payment Failed: Booking is expired',StatusCodes.BAD_REQUEST);
      }
      if(Number(bookingDetails.totalCost) !== Number(data.totalCost)){
        throw new AppError('Payment Failed: Invalid amount',StatusCodes.BAD_REQUEST);
      }
      if(bookingDetails.userId != data.userId){
        throw new AppError('Payment Failed: Invalid user',StatusCodes.BAD_REQUEST);
      }
      //we assume payment is successful
      const response=await bookingRepository.update(data.bookingId,{status:'BOOKED'},transaction);
      await transaction.commit();
      await sendData({
       recipientEmail:"www.ayushtiwari1888@gmail.com",
       subject: "Booking Created ✅",
       content: `Your booking for flight ${data.flightId} is created!`,
      });
      return response;
    }
    catch(error){
      await transaction.rollback();
      throw error;
    }
}
async function cancelBooking(data, t = null) {
    const transaction = t || await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(data.bookingId, transaction);
        
        if (bookingDetails.status === 'CANCELLED') {
            if(!t) await transaction.commit(); // Only commit if we created the transaction
            return true;
        }

        await bookingRepository.update(data.bookingId, { status: 'CANCELLED' }, transaction);

        await axios.patch(`http://localhost:3000/api/v1/flights/${bookingDetails.flightId}/seats`, {
            Seats: Number(bookingDetails.noOfSeats),
            dec: false 
        });

        if(!t) await transaction.commit(); 
        return true;
    } catch (error) {
        if(!t) await transaction.rollback();
        throw error;
    }
}
async function cancelOldInitialBookings() {
    const transaction = await db.sequelize.transaction();
    try {
        const cutoffTime = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago
        const expiredBookings = await bookingRepository.getExpiredBookings(cutoffTime, transaction);
        for (const booking of expiredBookings) {
            await cancelBooking({ bookingId: booking.id }, transaction);
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports={
  create,
  makePayment,
  cancelBooking,
  cancelOldInitialBookings
};