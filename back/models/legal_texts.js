'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class legal_texts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  legal_texts.init({
    title: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'legal_texts',
  });
  return legal_texts;
};