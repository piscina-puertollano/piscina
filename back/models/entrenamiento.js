/**
 * @author Marina Laguna
 */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entrenamiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entrenamiento.belongsToMany(models.Ejercicio, {
        through: models.EjercicioEntrenamiento,
        foreignKey: 'idEntrenamiento', 
      });
  
      Entrenamiento.hasMany(models.EjercicioEntrenamiento, {
        foreignKey: 'idEntrenamiento',
      });
    }
  }
  Entrenamiento.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entrenamiento',
    tableName: process.env.TABLE_ENTRENAMIENTOS
  });
  return Entrenamiento;
};