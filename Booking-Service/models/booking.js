'use strict';
const {
  Model
} = require('sequelize');
const { BOOKING_STATUS } = require('../src/utils/Common/ENUMS');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    noOfSeats:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    totalCost:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    status: {
    type: DataTypes.ENUM(
        BOOKING_STATUS.INITIATED,
        BOOKING_STATUS.BOOKED,
        BOOKING_STATUS.CANCELLED
      ),
      allowNull: false,
      defaultValue: BOOKING_STATUS.INITIATED
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};