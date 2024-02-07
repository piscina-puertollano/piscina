'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recursosEntrenamiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recursosEntrenamiento.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entrenamiento_id: DataTypes.INTEGER,
    asset_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recursosEntrenamiento',
    tableName: 'recursosEntrenamientos'
  });
  return recursosEntrenamiento;
};