const { SuccessResponse,ErrorResponse } = require("../utils/Common");
const {BookingService} = require("../services");
async function createBooking(req, res) {
  try {
    const flightid=req.body.flightId;
    const userid=req.body.userId;
    const seats=req.body.noOfSeats;
    const idempotency_key=req.headers['idempotency-key'];
    const booking = await BookingService.create({ flightId:flightid,userId:userid,noOfSeats:seats,
       Idempotency_key:idempotency_key
     });
    SuccessResponse.data = booking;
    return res.status(201).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    ErrorResponse.message = error.message || "Internal Server Error";
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json(ErrorResponse);
  }
}

async function getBooking(req, res) {
    try {
        const bookingId = req.params.id;
        const booking = await BookingService.get(bookingId);
        SuccessResponse.data = booking;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message || "Internal Server Error";
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(ErrorResponse);
    }
}
async function getAllBookings(req, res) {
    try {
        const bookings = await BookingService.getAll();
        SuccessResponse.data = bookings;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message || "Internal Server Error";
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(ErrorResponse);
    }
}
async function makePayment(req, res) {
    try {
        const { bookingId, userId, totalCost } = req.body;
        const paymentResponse = await BookingService.makePayment({ bookingId, userId, totalCost });
        SuccessResponse.data = paymentResponse;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message || "Internal Server Error";
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(ErrorResponse);
    }
}
module.exports = {
  createBooking,
  getBooking,
  getAllBookings,
  makePayment
};

