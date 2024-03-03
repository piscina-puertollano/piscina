'use strict';
/**
 * @author: badr
 */

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alergias extends Model {

    static associate(models) {

    }
  }
  alergias.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'alergias',
    timestamps: false
  });
  return alergias;
};