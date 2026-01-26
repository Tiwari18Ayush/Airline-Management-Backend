'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
          foreignKey: 'CityId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
    }
  }
  Airports.init({
    name: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    code:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    address: {
      type:DataTypes.STRING,
      unique:true,
    },
    CityId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Airports',
  });
  return Airports;
};