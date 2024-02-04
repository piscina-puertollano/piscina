'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TutorUser extends Model {

    static associate(models) {
    }
  }
  TutorUser.init({
    id_tutor: DataTypes.INTEGER,
    id_socio: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TutorUser',
  });
  return TutorUser;
};