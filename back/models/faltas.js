'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faltas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  faltas.init({
    idfaldas: DataTypes.INTEGER,
    usuario_idusuario: DataTypes.INTEGER,
    clase_idclase: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'faltas',
  });
  return faltas;
};