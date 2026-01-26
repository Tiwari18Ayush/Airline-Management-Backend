'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate(models) {
      // associations later (Flight.hasMany(Bookings))
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        as: 'airplaneDetail'
      });
      this.belongsTo(models.Airports, {
        foreignKey: 'departureAirportId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        as: 'departureAirport'
      });

      this.belongsTo(models.Airports, {
        foreignKey: 'arrivalAirportId',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        as: 'arrivalAirport'
      });
    }
  }

  Flight.init(
    {
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // flight number should be unique
      },

      airlineCode: {
        type: DataTypes.STRING,
        allowNull: false, // every flight belongs to an airline
      },

      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false, // scheduling is mandatory
      },

      departureTime: {
        type: DataTypes.DATE,
        allowNull: false, // scheduling is mandatory
      },

      boardingGate: {
        type: DataTypes.STRING,
        allowNull: true, // gate can be assigned later
      },

      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0, // price can’t be negative
        },
      },

      totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1, // at least 1 seat must exist
        },
      },
      departureAirportId: {
  type: DataTypes.INTEGER,
  allowNull: true
},

arrivalAirportId: {
  type: DataTypes.INTEGER,
  allowNull: true
},

    },
    {
      sequelize,
      modelName: 'Flight',
      tableName: 'Flights',
    }
  );

  return Flight;
};
