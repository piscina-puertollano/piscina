'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ejercicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ejercicio.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idCalentamiento: DataTypes.INTEGER,
    idPrincipal: DataTypes.INTEGER,
    idRelax: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ejercicio',
    tableName: 'ejercicio'
  });
  return Ejercicio;
};