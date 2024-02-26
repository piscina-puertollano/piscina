'use strict';
const {
  Model
} = require('sequelize');

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
  class user_alergias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_alergias.init({
    id_user: DataTypes.INTEGER,
    id_alergia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_alergias',
  });
  return user_alergias;
};