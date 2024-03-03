/**
 * @author: Marina Laguna
 */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PuntuacionUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PuntuacionUsuario.belongsTo(models.Puntuacion, {
        foreignKey: 'idPuntuacion',
        as: 'puntuacion'
      });
    }
  }
  PuntuacionUsuario.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: DataTypes.INTEGER,
    idPuntuacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PuntuacionUsuario',
    tableName: 'puntuacionUsuarios'
  });
  return PuntuacionUsuario;
};