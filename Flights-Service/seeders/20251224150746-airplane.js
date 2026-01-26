'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('🔥 Airplane seeder running');

    await queryInterface.bulkInsert(
      'airplanes',   // MUST MATCH DB TABLE
      [
        {
          modelNo: 'A320',
          capacity: 180,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
         modelNo: 'B737',
          capacity: 160,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('airplanes', null, {});
  }
};
