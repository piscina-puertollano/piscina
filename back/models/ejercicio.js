/**
 * author: Marina Laguna
 */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ejercicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ejercicio.belongsTo(models.Tipo, {
        foreignKey: 'idTipo',
        as: 'tipo'
      });
    }    
  }
  Ejercicio.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idTipo: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ejercicio',
    tableName: 'ejercicio'
  });
  return Ejercicio;
};