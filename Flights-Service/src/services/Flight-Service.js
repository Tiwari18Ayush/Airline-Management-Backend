const FlightRepository = require('../repositories/Flight-repository');
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');

// create ONE instance of repository
const flightRepository = new FlightRepository();

/**
 * Create a new flight
 */
async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    throw new AppError('Something went wrong in Service Layer', 400);
  }
}

/**
 * Get all flights with filters
 */
async function getAllFlights(query) {
  const customFilter = {};

  // helper to remove accidental quotes from query params
  const clean = (value) => value.replace(/^"|"$/g, '');

  /* =======================
     TRIPS FILTER (BOM-BLR)
     ======================= */
  if (query.trips) {
    const cleanedTrips = clean(query.trips);
    const parts = cleanedTrips.split('-');

    if (parts.length !== 2) {
      throw new AppError(
        'Trips must be in format DEPARTURE-ARRIVAL (e.g. BOM-BLR)',
        400
      );
    }

    
  }

  /* =======================
     PRICE FILTER (5000-10000)
     ======================= */
  if (query.price) {
    const cleanedPrice = clean(query.price);
    const parts = cleanedPrice.split('-');

    const minPrice = Number(parts[0]);
    const maxPrice = parts[1] ? Number(parts[1]) : 20000;

    if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) {
      throw new AppError('Invalid price range', 400);
    }

    customFilter.price = {
      [Op.between]: [minPrice, maxPrice]
    };
  }

  /* =======================
     TRAVELLERS FILTER
     ======================= */
  if (query.travellers) {
    const travellers = Number(query.travellers);

    if (Number.isNaN(travellers) || travellers <= 0) {
      throw new AppError('Invalid travellers count', 400);
    }

    customFilter.totalSeats = {
      [Op.gte]: travellers
    };
  }

  /* =======================
     TRIP DATE FILTER
     ======================= */
  if (query.tripDate) {
    const startDate = new Date(`${query.tripDate} 00:00:00`);
    const endDate = new Date(`${query.tripDate} 23:59:59`);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new AppError('Invalid trip date format', 400);
    }

    customFilter.departureTime = {
      [Op.between]: [startDate, endDate]
    };
  }

  /* =======================
     AIRLINE FILTER
     ======================= */
  if (query.airlineCode) {
    customFilter.airlineCode = clean(query.airlineCode);
  }

  /* =======================
     FLIGHT NUMBER FILTER
     ======================= */
  if (query.flightNumber) {
    customFilter.flightNumber = clean(query.flightNumber);
  }

  try {
    // console.log('CUSTOM FILTER BEFORE DB =>', customFilter);

   const flights = await flightRepository.getAllFlightsWithDetails(
  customFilter,
  query
);
    return flights;
  } catch (error) {
    throw new AppError(
      'Cannot fetch data of all the flights',
      500
    );
  }
}
async function getFlight(data) {
  try{
    const flight = await flightRepository.get(data);
    return flight;
  }
  catch(e){
    throw new AppError('Cannot fetch the data of flight', 500);
  }  
}
async function updateRemainingSeats(flightId,Seats,dec=true) {
  console.log("Service Layer: Updating Remaining Seats");
  try{
    const flight=await flightRepository.updateremainingSeats(flightId,Seats,dec);
    return flight;
  }
  catch(e){
    throw new AppError('Cannot update the remaining seats', 500);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateRemainingSeats
};
