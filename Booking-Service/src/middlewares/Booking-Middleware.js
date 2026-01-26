const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/Errors/app-error');
async function validateBookingData(req, res, next) {
    const { flightId, userId, noOfSeats, totalCost } = req.body;
    const Idempotency_key=req.headers['idempotency-key'];
    if (!flightId || !userId || !noOfSeats ) {
        throw new AppError("Incomplete booking data", StatusCodes.BAD_REQUEST);
    }
    if(!Idempotency_key){
        throw new AppError("Idempotency Key required",StatusCodes.BAD_REQUEST);
    }
    if (noOfSeats <= 0) {
        throw new AppError("Number of seats must be at least 1", StatusCodes.BAD_REQUEST);
    }
    
    next();
}
async function validatePaymentData(req, res, next) {

    const {bookingId, userId, totalCost } = req.body;
    if (!bookingId || !userId || !totalCost ) {
        throw new AppError("Incomplete payment data", StatusCodes.BAD_REQUEST);
    }
    if (totalCost <= 0) {
        throw new AppError("Total cost must be greater than 0", StatusCodes.BAD_REQUEST);
    }
    next();
}
module.exports = {
    validateBookingData,
    validatePaymentData
};
