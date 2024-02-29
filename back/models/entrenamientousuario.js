/**
 * @author: Marina Laguna
 */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntrenamientoUsuario extends Model {
    static associate(models) {
      
    }
  }
  EntrenamientoUsuario.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: DataTypes.INTEGER,
    entrenamiento_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EntrenamientoUsuario',
    tableName: 'entrenamientosUsuarios'
  });
  return EntrenamientoUsuario;
};