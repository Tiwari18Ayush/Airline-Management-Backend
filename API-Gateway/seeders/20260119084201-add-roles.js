'use strict';
const { ROLE_ENUM } = require('../src/utils/Common/ENUMS');
const { ADMIN, USER, COMPANY } = ROLE_ENUM;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { name: ADMIN, createdAt: new Date(), updatedAt: new Date() },
      { name: USER, createdAt: new Date(), updatedAt: new Date() },
      { name: COMPANY, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};