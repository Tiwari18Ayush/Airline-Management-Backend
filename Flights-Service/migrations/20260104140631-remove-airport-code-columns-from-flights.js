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
    await queryInterface.removeColumn('Flights','arrivalAirport');
    await queryInterface.removeColumn('Flights','departureAirport');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('Flights','arrivalAirport',{
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Flights','departureAirport',{
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
