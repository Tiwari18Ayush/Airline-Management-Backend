const airportService = require('../services/Airport-Service');

/**
 * CREATE AIRPORT
 * POST /api/v1/airports
 */
async function createAirport(req, res) {
  try {
    const airport = await airportService.createAirport(req.body);

    return res.status(201).json({
      success: true,
      message: 'Airport created successfully',
      data: airport
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
}

/**
 * GET ALL AIRPORTS
 * GET /api/v1/airports
 */
async function getAirports(req, res) {
  try {
    const airports = await airportService.getAirports();

    return res.status(200).json({
      success: true,
      data: airports
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
}

/**
 * GET AIRPORT BY ID
 * GET /api/v1/airports/:id
 */
async function getAirportById(req, res) {
  try {
    const airport = await airportService.getAirportById(req.params.id);

    return res.status(200).json({
      success: true,
      data: airport
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
}

/**
 * DELETE AIRPORT
 * DELETE /api/v1/airports/:id
 */
async function deleteAirport(req, res) {
  try {
    await airportService.deleteAirport(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Airport deleted successfully'
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
}

/**
 * UPDATE AIRPORT
 * PATCH /api/v1/airports/:id
 */
async function updateAirport(req, res) {
  try {
    const airport = await airportService.updateAirport(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: 'Airport updated successfully',
      data: airport
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirportById,
  deleteAirport,
  updateAirport
};
