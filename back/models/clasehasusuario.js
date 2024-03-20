// Manuel Garcia
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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
       type: DataTypes.INTEGER,
       allowNull: false,
    },
    id_clase: DataTypes.INTEGER
   }, {
    sequelize,
    modelName: process.env.TABLE_CLASE_USUARIO,
    tableName: process.env.TABLE_CLASE_USUARIO,
    timestamps: false
   });
   
  return ClaseHasUsuario;
};