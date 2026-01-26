const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/Common');

/**
 * VALIDATE CREATE AIRPORT REQUEST
 */
function validateCreateRequest(req, res, next) {
  const { name, code, CityId } = req.body;

  if (!name) {
    ErrorResponse.message = 'Airport name is required';
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!code) {
    ErrorResponse.message = 'Airport code is required';
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!CityId) {
    ErrorResponse.message = 'CityId is required';
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

/**
 * VALIDATE UPDATE AIRPORT REQUEST
 */
function validateUpdateRequest(req, res, next) {
  const { name, code, CityId } = req.body;

  // PATCH → at least one field must be present
  if (!name && !code && !CityId && !req.body.address) {
    ErrorResponse.message = 'At least one field is required to update';
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest
};
