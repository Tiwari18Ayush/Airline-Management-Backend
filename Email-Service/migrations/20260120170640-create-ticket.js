'use strict';
/** @type {import('sequelize-cli').Migration} */
const {ENUMS}=require('../src/utils/Common');
const {PENDING,SUCCESS,FAILED}=ENUMS.STATUS_ENUMS;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING,
        allowNull:false
      },
      content: {
        type: Sequelize.STRING,
         allowNull:false
      },
      recipentEmail: {
        type: Sequelize.STRING,
         allowNull:false

      },
      status: {
        type: Sequelize.ENUM(PENDING, SUCCESS, FAILED),
        allowNull:false,
         defaultValue: PENDING
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
    await queryInterface.dropTable('Tickets');
  }
};