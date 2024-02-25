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
      EjercicioEntrenamiento.belongsTo(models.Ejercicio, { 
        foreignKey: 'idEjercicio' 
      });
      EjercicioEntrenamiento.belongsTo(models.Ejercicio, { 
        foreignKey: 'idEntrenamiento' 
      });
    }
  }
  EjercicioEntrenamiento.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idEjercicio: {
      type: DataTypes.INTEGER,
      references: {
        tableName: 'ejercicio',
        key: 'id',
      }
    },
    idEntrenamiento: {
      type: DataTypes.INTEGER,
      references: {
        tableName: 'entrenamientos',
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'EjercicioEntrenamiento',
    tableName: 'ejercicioEntrenamiento'
  });
  return EjercicioEntrenamiento;
};