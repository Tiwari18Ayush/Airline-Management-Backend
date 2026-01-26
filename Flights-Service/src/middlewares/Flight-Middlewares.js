const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

function validateCreateFlight(req, res, next) {
  const {
    flightNumber,
    airlineCode,
    departureAirport,
    arrivalAirport,
    departureTime,
    price,
    totalSeats,
    airplaneId,
  } = req.body;

  if (
    !flightNumber ||
    !airlineCode ||
    !departureAirport ||
    !arrivalAirport ||
    !departureTime ||
    price == null ||
    totalSeats == null ||
    !airplaneId
  ) {
    throw new AppError("Flight Cannot be created from incomplete data",StatusCodes.BAD_REQUEST);
    };
     next();
  }

 function validateUpdateSeats(req,res,next){
   const {Seats}=req.body;
    if(Seats==null){
    throw new AppError("Seats data is required to update seats",StatusCodes.BAD_REQUEST);
    }
    next();
 }


module.exports = {
  validateCreateFlight,
  validateUpdateSeats
};
