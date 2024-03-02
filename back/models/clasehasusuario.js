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
    id_usuario: {
       type: DataTypes.INTEGER,
       allowNull: false,
       primaryKey: true, // Indica que id_usuario es la clave primaria
    },
    id_clase: DataTypes.INTEGER
   }, {
    sequelize,
    modelName: 'clase_has_usuario',
    tableName: 'clase_has_usuario',
    timestamps: false
   });
   
  return ClaseHasUsuario;
};