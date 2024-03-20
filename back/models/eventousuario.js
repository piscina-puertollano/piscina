// Gonzalo Martinez Haro
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
      
      this.belongsTo(models.Evento, {
        foreignKey: 'idEvento',
        as: 'evento'
      });

      this.belongsTo(models.Users, {
        foreignKey: 'idUsuario',
        as: 'usuario'
      });
    }
  }
  EventoUsuario.init({
    idUsuario: DataTypes.INTEGER,
    idEvento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EventoUsuario',
    tableName: process.env.TABLE_EVENTO_USUARIO
  });
  return EventoUsuario;
};