'use strict';
const {
  Model
} = require('sequelize');

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
  class CommentsNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CommentsNews.init({
    id_new: DataTypes.INTEGER,
    id_comment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CommentsNews',
  });
  return CommentsNews;
};