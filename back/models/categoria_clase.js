//Manuel Garcia
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoria_clase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Evento, {
        foreignKey: 'id_categoria',
        as: process.env.TABLE_CLASES
      });
    }
  }
  categoria_clase.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categoria_clase',
    tableName: process.env.TABLE_CATEGORIA_CLASES
  });
  return categoria_clase;
};