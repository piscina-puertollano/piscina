'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntrenamientoUsuario extends Model {
    static associate(models) {
      this.belongsTo(models.Entrenamiento, {
        foreignKey: 'idEntrenamiento',
        as: 'entrenamiento'
      });
      this.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'usuario'
      });
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