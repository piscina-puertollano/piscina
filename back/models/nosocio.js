'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoSocio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.hasMany(models.EventoNoSocio, {
        foreignKey: 'idNoSocio',
        as: 'eventosNoSocios'
      });
    }
  }
  NoSocio.init({
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NoSocio',
    tableName: 'noSocios'
  });
  return NoSocio;
};