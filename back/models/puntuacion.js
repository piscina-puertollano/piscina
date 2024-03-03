/**
 * @author Marina Laguna
 */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Puntuacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Puntuacion.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nota: DataTypes.INTEGER,
    idEntrenamiento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Puntuacion',
    tableName: process.env.TABLE_PUNTUACIONES
  });
  return Puntuacion;
};