const { StatusCodes } = require('http-status-codes');
const flightService = require('../services/Flight-Service');
const {SuccessResponse,ErrorResponse}=require('../utils/Common');

/**
 * POST /api/v1/flights
 */
async function createFlight(req, res) {
  try{
      const flight=await flightService.createFlight({
         airplaneId:req.body.airplaneId,
         flightNumber:req.body.flightNumber,
          airlineCode:req.body.airlineCode,
         departureAirportId: req.body.departureAirportId,
         arrivalAirportId: req.body.arrivalAirportId,

            departureTime:req.body.departureTime,
            boardingGate:req.body.boardingGate,
            price:req.body.price,
             totalSeats:req.body.totalSeats,
             arrivalTime:req.body.arrivalTime
      })
      SuccessResponse.success=true;
      SuccessResponse.message="Flight Created Successfully";
      SuccessResponse.data=flight;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
  }
  catch(e){
    ErrorResponse.success=false;
    ErrorResponse.message="Flight could not be created";
    return res.status(StatusCodes.CONFLICT).json(ErrorResponse);

  }
}
async function getAllFlights(req,res){
  // console.log('REQ QUERY =>', req.query);

  try{
    const flights=await flightService.getAllFlights(req.query); 
    SuccessResponse.success=true;
    SuccessResponse.message="Flights fetched successfully";
    SuccessResponse.data=flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  }
  catch(e){
    ErrorResponse.success=false;
    ErrorResponse.message=e.message;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
} 
async function getFlight(req,res){
  try{
    const flight=await flightService.getFlight(req.params.id);
    SuccessResponse.success=true;
    SuccessResponse.message="Flight fetched successfully";
    SuccessResponse.data=flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  }
  catch(e){
    ErrorResponse.success=false;
    ErrorResponse.message=e.message;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}
async function updateRemainingSeats(req,res){
  const {Seats,dec}=req.body;
  const {id}=req.params;
  
  try{
    const flight=await flightService.updateRemainingSeats(id,Seats,dec);
    SuccessResponse.success=true;
    SuccessResponse.message="Flight seats updated successfully";
    SuccessResponse.data=flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  }
  catch(e){
    ErrorResponse.success=false;
    ErrorResponse.message=e.message;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}  

module.exports={
  createFlight,
  getAllFlights,
  getFlight,
  updateRemainingSeats
}