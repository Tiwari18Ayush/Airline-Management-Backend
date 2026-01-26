const BOOKING_STATUS = Object.freeze({//freeze makes the object immutable i.e.
//  its properties cannot be changed
  INITIATED: 'INITIATED',
  BOOKED: 'BOOKED',
  CANCELLED: 'CANCELLED'
});
// Exporting the ENUM for use in other parts of the application
module.exports = {
  BOOKING_STATUS
};
