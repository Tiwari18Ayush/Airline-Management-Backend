const express= require('express');
const { BookingController } = require('../../controllers');
const { BookingMiddleware } = require('../../middlewares');

const router= express.Router();
/**
 * POST /api/v1/bookings
 */
router.post(
    '/',
    BookingMiddleware.validateBookingData,
    BookingController.createBooking
);
/**
 * GET /api/v1/bookings/:id
 */
router.get(
    '/',
    BookingController.getAllBookings
);
router.post(
    '/payment',
    BookingMiddleware.validatePaymentData,
    BookingController.makePayment
);
module.exports=router;
