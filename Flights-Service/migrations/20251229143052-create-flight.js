'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER
},

      airplaneId: {
      type: Sequelize.INTEGER,
     allowNull: false,
     references: {
     model: 'Airplanes',
    key: 'id'
  },
   onDelete: 'RESTRICT',
   onUpdate: 'CASCADE'
},


      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // DB-level uniqueness
      },

      airlineCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      departureAirport: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      arrivalAirport: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      departureTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      boardingGate: {
        type: Sequelize.STRING,
        allowNull: true, // assigned later
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0, // ORM-level validation (still okay here)
        },
      },

      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  },
};
