const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const airplaneRepository = new AirplaneRepository();

/**
 * CREATE
 */
async function createAirplane(data) {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new AppError('Request body is empty', 400);
    }

    return await airplaneRepository.create(data);

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [createAirplane]:', error);
    throw new AppError('Failed to create airplane', 500);
  }
}

/**
 * GET ALL
 */
async function getAirplane() {
  try {
    return await airplaneRepository.getAll();

  } catch (error) {
    console.error('❌ Service Error [getAirplane]:', error);
    throw new AppError('Failed to fetch airplanes', 500);
  }
}

/**
 * GET BY ID
 */
async function getAirplanebyid(id) {
  try {
    if (!id) {
      throw new AppError('Airplane ID is required', 400);
    }

    const airplane = await airplaneRepository.get(id);

    if (!airplane) {
      throw new AppError('Airplane not found', 404);
    }

    return airplane;

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [getAirplanebyid]:', error);
    throw new AppError('Failed to fetch airplane', 500);
  }
}

/**
 * DELETE
 */
async function deleteAirplane(id) {
  try {
    if (!id) {
      throw new AppError('Airplane ID is required', 400);
    }

    const deletedCount = await airplaneRepository.destroy(id);

    if (!deletedCount) {
      throw new AppError('Airplane not found', 404);
    }

    return deletedCount;

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [deleteAirplane]:', error);
    throw new AppError('Failed to delete airplane', 500);
  }
}

/**
 * UPDATE
 */
async function updateAirplane(id, data) {
  try {
    if (!id) {
      throw new AppError('Airplane ID is required', 400);
    }

    if (!data || Object.keys(data).length === 0) {
      throw new AppError('Update data is empty', 400);
    }

    const updated = await airplaneRepository.update(id, data);

    if (!updated) {
      throw new AppError('Airplane not found', 404);
    }

    return updated;

  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error('❌ Service Error [updateAirplane]:', error);
    throw new AppError('Failed to update airplane', 500);
  }
}

module.exports = {
  createAirplane,
  getAirplane,
  getAirplanebyid,
  deleteAirplane,
  updateAirplane
};
