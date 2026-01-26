const CRUDREPOSITORY = require('./CRUD-repository');
const { Flight, Airports, Airplane,db} = require('../models');

class FlightRepository extends CRUDREPOSITORY {
  constructor() {
    super(Flight);
  }

  async getAllFlightsWithDetails(filter, query) {
    const include = [
      {
        model: Airports,
        as: 'departureAirport'
      },
      {
        model: Airports,
        as: 'arrivalAirport'
      },
      {
        model: Airplane,
        as: 'airplaneDetail'
      }
    ];

    // ✅ APPLY TRIPS FILTER VIA JOIN
    if (query?.trips) {
      const [from, to] = query.trips.split('-');

      include[0].where = { code: from };
      include[1].where = { code: to };
    }

    return Flight.findAll({
      where: filter,
      include
    });
  }
async updateremainingSeats(flightId, Seats, dec = true) {
    try {
        const shouldDecrement = (String(dec) === 'true' || dec === true);

        if (shouldDecrement) {
            // This sends: UPDATE Flights SET totalSeats = totalSeats - Seats WHERE id = flightId
            await Flight.decrement('totalSeats', { 
                by: Seats, 
                where: { id: flightId } 
            });
        } else {
            await Flight.increment('totalSeats', { 
                by: Seats, 
                where: { id: flightId } 
            });
        }

        // Fetch the updated flight to return to the controller
        const flight = await Flight.findByPk(flightId);
        return flight;
    } catch (error) {
        throw new AppError('Cannot update the remaining seats', 500);
    }
}
}
  

module.exports = FlightRepository;
