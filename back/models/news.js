'use strict';
const { Model } = require('sequelize');

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
  class News extends Model {

    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'id_user',
        as: 'author'
      });
      this.hasMany(models.Comments, {
        foreignKey: 'id_news',
        as: 'comments'
      });
      this.hasOne(models.Assets, {
        foreignKey: 'id',
        sourceKey: 'main_image',
        as: 'new_image'
      });
    }
  }
  News.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    id_user: DataTypes.INTEGER,
    main_image: DataTypes.INTEGER,
    visit_counter: DataTypes.INTEGER,
    share_counter: DataTypes.INTEGER,
    like_counter: DataTypes.INTEGER,
    dislike_counter: DataTypes.INTEGER,
    category: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
    tableName: process.env.TABLE_NEWS
  });
  return News;
};