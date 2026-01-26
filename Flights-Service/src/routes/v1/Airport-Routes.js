const express = require('express');
const { AirportController } = require('../../controllers');
const { AirportMiddleware } = require('../../middlewares');

const router = express.Router();

console.log('✅ Airport-Routes.js loaded');

router.use((req, res, next) => {
  console.log('🔥 Airport router HIT =>', req.method, req.originalUrl);
  next();
});

/**
 * CREATE AIRPORT
 * POST /api/v1/airports
 */
router.post(
  '/',
  AirportMiddleware.validateCreateRequest,
  AirportController.createAirport
);

/**
 * GET ALL AIRPORTS
 * GET /api/v1/airports
 */
router.get('/', AirportController.getAirports);

/**
 * GET AIRPORT BY ID
 * GET /api/v1/airports/:id
 */
router.get('/:id', AirportController.getAirportById);

/**
 * DELETE AIRPORT
 * DELETE /api/v1/airports/:id
 */
router.delete('/:id', AirportController.deleteAirport);

/**
 * UPDATE AIRPORT
 * PATCH /api/v1/airports/:id
 */
router.patch(
  '/:id',
  AirportMiddleware.validateUpdateRequest,
  AirportController.updateAirport
);

module.exports = router;
