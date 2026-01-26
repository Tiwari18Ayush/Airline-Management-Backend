'use strict';
const {
  Model
} = require('sequelize');
const { ROLE_ENUM } = require('../utils/Common/ENUMS.js');
const {ADMIN, USER, COMPANY} = ROLE_ENUM;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       this.belongsToMany(models.User,{
        through:'UserRole',
        as:'users',
        foreignKey:'roleId'
      })
    }
  }
  Role.init({
    name: {
      type: DataTypes.ENUM,
      allowNull: false,
      values:[
        ADMIN,
        USER,
        COMPANY
      ],
      defaultValue: USER
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};