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
      // define association here
    }
  }
  Puntuacion.init({
    id: DataTypes.INTEGER,
    nota: DataTypes.INTEGER,
    entrenamiento_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Puntuacion',
    tableName: 'puntuaciones'
  });
  return Puntuacion;
};