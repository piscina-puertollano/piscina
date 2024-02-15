'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {

    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'id_user',
        as: 'author'
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
    visit_counter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
    tableName: 'news'
  });
  return News;
};