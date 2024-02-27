'use strict';
const {
  Model
} = require('sequelize');

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
  class Escaparate extends Model {

    static associate(models) {

    }
  }
  Escaparate.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Escaparate',
  });
  return Escaparate;
};