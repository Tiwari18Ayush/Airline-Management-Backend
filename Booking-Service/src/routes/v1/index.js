const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/bookings', require('./Booking-Routes'));

module.exports = router;