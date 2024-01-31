'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  evento.init({
    nombre: DataTypes.STRING,
    fecha: DataTypes.DATE,
    sede: DataTypes.STRING,
    categoria: DataTypes.STRING,
    visible: DataTypes.BOOLEAN,
    privado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'evento',
  });
  return evento;
};