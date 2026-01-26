'use strict';
const {
  Model
} = require('sequelize');
const {ENUMS}=require('../src/utils/Common');
const {PENDING,SUCCESS,FAILED}=ENUMS.STATUS_ENUMS;
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    subject: {
      type:DataTypes.STRING,
      allowNull:false
    },
    content:{
      type:DataTypes.STRING,
      allowNull:false
    },
    recipentEmail:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:true
      }
    },
    status: {
      type: DataTypes.ENUM(PENDING, SUCCESS, FAILED),
       allowNull: false,
       defaultValue: PENDING
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};