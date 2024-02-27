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
        as: 'clase'
      });
    }
  }
  categoria_clase.init({
    firstName: DataTypes.INTEGER,
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categoria_clase',
    tableName: 'categoria_clase'
  });
  return categoria_clase;
};