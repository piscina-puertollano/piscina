/**
 * @author Marina Laguna
 */
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
        foreignKey: 'ejercicioId'
      });

      EjercicioEntrenamiento.belongsTo(models.Entrenamiento, { 
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
    ejercicioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Ejercicio',
        key: 'id',
      }
    },
    idEntrenamiento: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Entrenamiento',
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'EjercicioEntrenamiento',
    tableName: process.env.TABLE_EJERCICIO_ENTRENAMIENTOS,
    freezeTableName: true,
  });
  return EjercicioEntrenamiento;
};