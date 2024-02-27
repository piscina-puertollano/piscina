'use strict';
const {
  Model
} = require('sequelize');

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
  class TutorUser extends Model {

    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'id_tutor',
        as: 'tutor'
      });

      this.belongsTo(models.Users, {
        foreignKey: 'id_socio',
        as: 'socio'
      });
    }
  }
  TutorUser.init({
    id_tutor: DataTypes.INTEGER,
    id_socio: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TutorUser',
    tableName:'tuto_users'
  });
  return TutorUser;
};