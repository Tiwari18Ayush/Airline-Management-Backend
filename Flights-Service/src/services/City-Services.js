const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

/**
 * CREATE CITY
 */
async function createCity(data) {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new AppError('Request body is empty', 400);
    }

    return await cityRepository.create(data);

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [createCity]:', error);
    throw new AppError('Failed to create city', 500);
  }
}

/**
 * GET ALL CITIES
 */
async function getCity() {
  try {
    return await cityRepository.getAll();

  } catch (error) {
    console.error('❌ Service Error [getCity]:', error);
    throw new AppError('Failed to fetch cities', 500);
  }
}

/**
 * GET CITY BY ID
 */
async function getCitybyid(id) {
  try {
    if (!id) {
      throw new AppError('City ID is required', 400);
    }

    const city = await cityRepository.get(id);

    if (!city) {
      throw new AppError('City not found', 404);
    }

    return city;

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [getCitybyid]:', error);
    throw new AppError('Failed to fetch city', 500);
  }
}

/**
 * DELETE CITY
 */
async function deleteCity(id) {
  try {
    if (!id) {
      throw new AppError('City ID is required', 400);
    }

    const deletedCount = await cityRepository.destroy(id);

    if (!deletedCount) {
      throw new AppError('City not found', 404);
    }

    return deletedCount;

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [deleteCity]:', error);
    throw new AppError('Failed to delete city', 500);
  }
}

/**
 * UPDATE CITY
 */
async function updateCity(id, data) {
  try {
    if (!id) {
      throw new AppError('City ID is required', 400);
    }

    if (!data || Object.keys(data).length === 0) {
      throw new AppError('Update data is empty', 400);
    }

    const updatedCity = await cityRepository.update(id, data);

    if (!updatedCity) {
      throw new AppError('City not found', 404);
    }

    return updatedCity;

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [updateCity]:', error);
    throw new AppError('Failed to update city', 500);
  }
}

module.exports = {
  createCity,
  getCity,
  getCitybyid,
  deleteCity,
  updateCity
};
