'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_accept_legal_text extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_accept_legal_text.init({
    id_user: DataTypes.INTEGER,
    id_legal_text: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_accept_legal_text',
    tableName:process.env.TABLE_USER_ACCEPT_LEGAL_TEXTS,
  });
  return user_accept_legal_text;
};