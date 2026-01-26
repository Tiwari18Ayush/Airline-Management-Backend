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
    await queryInterface.addColumn('Flights', 'arrivalAirportId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Airports',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('Flights', 'departureAirportId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Airports',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Flights', 'arrivalAirportId');
    await queryInterface.removeColumn('Flights', 'departureAirportId');
  }
};
