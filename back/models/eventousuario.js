'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventoUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventoUsuario.init({
    isUsuario: DataTypes.INTEGER,
    idEvento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EventoUsuario',
    tableName: 'eventosUsuarios'
  });
  return EventoUsuario;
};