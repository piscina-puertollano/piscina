'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClaseHasUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClaseHasUsuario.init({
    usuario_idusuario: DataTypes.INTEGER,
    clase_idclase: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'clase_has_usuario',
  });
  return ClaseHasUsuario;
};