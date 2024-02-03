'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntrenamientoUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EntrenamientoUsuario.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: DataTypes.INTEGER,
    entrenamiento_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EntrenamientoUsuario',
    tableName: 'entrenamientosUsuarios'
  });
  return EntrenamientoUsuario;
};