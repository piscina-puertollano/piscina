'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assets extends Model {

    static associate(models) {
      // define association here
    }
  }
  Assets.init({
    ruta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Assets',
  });
  return Assets;
};