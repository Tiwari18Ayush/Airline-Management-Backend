'use strict';
/** @type {import('sequelize-cli').Migration} */
const { ROLE_ENUM } = require('../src/utils/Common/ENUMS');
const {ADMIN, USER, COMPANY} = ROLE_ENUM;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [
          ADMIN,
          USER,
          COMPANY
        ],
        defaultValue: USER
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
    await queryInterface.dropTable('Roles');
  }
};