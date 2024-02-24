'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EjercicioEntrenamiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EjercicioEntrenamiento.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idEjercicio: DataTypes.STRING,
    idEntrenamiento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EjercicioEntrenamiento',
    tableName: 'ejercicioEntrenamiento'
  });
  return EjercicioEntrenamiento;
};