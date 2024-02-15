'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {

    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'id_user',
        as: 'author'
      });
    }
  }
  News.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
    tableName: 'news'
  });
  return News;
};