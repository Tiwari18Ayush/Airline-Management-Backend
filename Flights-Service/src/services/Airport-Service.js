const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Sequelize } = require('sequelize');

const airportRepository = new AirportRepository();

/**
 * CREATE AIRPORT
 */
async function createAirport(data) {
  try {
    const { name, code, CityId } = data || {};

    if (!name || !code || !CityId) {
      throw new AppError(
        'name, code and CityId are required fields',
        400
      );
    }

    return await airportRepository.create(data);

  } catch (error) {
    // 🔁 Sequelize validation errors
    if (error instanceof Sequelize.ValidationError) {
      throw new AppError(error.errors[0].message, 400);
    }

    // 🔁 Unique constraint
    if (error instanceof Sequelize.UniqueConstraintError) {
      throw new AppError(
        `${error.errors[0].path} already exists`,
        409
      );
    }

    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [createAirport]:', error);
    throw new AppError('Failed to create airport', 500);
  }
}

/**
 * GET ALL AIRPORTS
 */
async function getAirports() {
  try {
    return await airportRepository.getAll();
  } catch (error) {
    console.error('❌ Service Error [getAirports]:', error);
    throw new AppError('Failed to fetch airports', 500);
  }
}

/**
 * GET AIRPORT BY ID
 */
async function getAirportById(id) {
  try {
    if (!id) {
      throw new AppError('Airport ID is required', 400);
    }

    const airport = await airportRepository.get(id);

    if (!airport) {
      throw new AppError('Airport not found', 404);
    }

    return airport;

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [getAirportById]:', error);
    throw new AppError('Failed to fetch airport', 500);
  }
}

/**
 * UPDATE AIRPORT
 */
async function updateAirport(id, data) {
  try {
    if (!id) {
      throw new AppError('Airport ID is required', 400);
    }

    if (!data || Object.keys(data).length === 0) {
      throw new AppError('Update data is empty', 400);
    }

    const updated = await airportRepository.update(id, data);

    if (!updated) {
      throw new AppError('Airport not found', 404);
    }

    return updated;

  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      throw new AppError(
        `${error.errors[0].path} already exists`,
        409
      );
    }

    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [updateAirport]:', error);
    throw new AppError('Failed to update airport', 500);
  }
}

/**
 * DELETE AIRPORT
 */
async function deleteAirport(id) {
  try {
    if (!id) {
      throw new AppError('Airport ID is required', 400);
    }

    const deleted = await airportRepository.destroy(id);

    if (!deleted) {
      throw new AppError('Airport not found', 404);
    }

    return deleted;

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [deleteAirport]:', error);
    throw new AppError('Failed to delete airport', 500);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirportById,
  updateAirport,
  deleteAirport
};
