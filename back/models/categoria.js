// Gonzalo Martinez Haro
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Evento, {
        foreignKey: 'idCategoria',
        as: 'eventos'
      });
    }
  }
  Categoria.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: process.env.TABLE_CATEGORIAS
  });
  return Categoria;
};