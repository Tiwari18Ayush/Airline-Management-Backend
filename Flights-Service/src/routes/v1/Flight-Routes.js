const express = require('express');
const flightController = require('../../controllers/flight-Controller');
const flightMiddlewares = require('../../middlewares/Flight-Middlewares');

const router = express.Router();

/**
 * POST /api/v1/flights
 */
router.post(
  '/',
  flightMiddlewares.validateCreateFlight,
  flightController.createFlight
);

/**
 * GET /api/v1/flights
 */
router.get(
  '/',
  flightController.getAllFlights
);

// /**
//  * GET /api/v1/flights/:id
//  */
router.get(
  '/:id',
  flightController.getFlight
);

// /**
//  * PATCH /api/v1/flights/:id
//  */
router.patch(
  '/:id/seats',
  flightMiddlewares.validateUpdateSeats,
  flightController.updateRemainingSeats
);

// /**
//  * DELETE /api/v1/flights/:id
//  */
// router.delete(
//   '/:id',
//   flightController.deleteFlight
// );

module.exports = router;
