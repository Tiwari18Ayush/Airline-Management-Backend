'use strict';
/** @type {import('sequelize-cli').Migration} */
const { BOOKING_STATUS } = require('../src/utils/Common/ENUMS');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      status: {
        type: Sequelize.ENUM(BOOKING_STATUS.INITIATED,
           BOOKING_STATUS.BOOKED,
           BOOKING_STATUS.CANCELLED),
        allowNull: false,
        defaultValue: BOOKING_STATUS.INITIATED        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};