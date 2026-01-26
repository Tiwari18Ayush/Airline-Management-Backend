'use strict';
const {
  Model
} = require('sequelize');
const {seat}=require('../src/utils/Common/ENUMS');
module.exports = (sequelize, DataTypes) => {
  class seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
      foreignKey: 'airplaneId'
});

    }
  }
  seats.init({
    airplaneId: {type:DataTypes.INTEGER,
      allowNull: false,
      references:{model:'Airplanes',
      key:'id'}
   },
    row: {type:DataTypes.INTEGER,
      allowNull: false,
    },
    col: {type:DataTypes.STRING,
      allowNull: false,
    },
    class: {type:DataTypes.STRING,
      allowNull: false,
      type: DataTypes.ENUM(...Object.values(seat))

    }
  }, {
    sequelize,
    modelName: 'seats',
  });
  return seats;
};