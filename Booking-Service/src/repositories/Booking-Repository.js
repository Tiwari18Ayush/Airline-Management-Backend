const CrudRepository = require('./CRUD_REPOSITORY');
const { Booking } = require('../../models');
const { Op } = require('sequelize');

class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking); 
  }
  async create(data, transaction) {
    const booking = await Booking.create(data, { transaction });
    return booking;
  }
 async get(id,transaction) {
    const response = await Booking.findByPk(id, { transaction });
    if(!response){
      throw new Error('Booking not found');
    }
    return response;
  }
 async update(id, data, transaction) {
    const response = await Booking.update(data, {
      where: { id },
      transaction
    });
    return response;
  }
  // Inside BookingRepository
async getExpiredBookings(cutoffTime, transaction) {
    return await Booking.findAll({
        where: {
            status: 'INITIATED',
            createdAt: { [Op.lt]: cutoffTime }
        },
        lock: transaction.LOCK.UPDATE, // Critical: Stops other processes from touching these rows
        skipLocked: true,             // Critical: Prevents Cron jobs from "hanging" if one is already running
        transaction
    });
}
async findBooking(idempotencykey){
  const response=await Booking.findOne({
    where:{
      Idempotency_key:idempotencykey
    }
  });
  return response;
}
} 
 
module.exports = BookingRepository;
