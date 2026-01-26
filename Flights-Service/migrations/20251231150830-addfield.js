'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Flights', 'arrivalTime', {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {
        isAfterDeparture(value) {
          if (value <= this.departureTime) {
            throw new Error('Arrival time must be after departure time');
          }
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    
    await queryInterface.removeColumn('Flights', 'arrivalTime');
  
  }
};
