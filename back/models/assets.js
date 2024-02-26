'use strict';
const {
  Model
} = require('sequelize');

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
  class Assets extends Model {

    static associate(models) {

      this.belongsToMany(models.Users, {
        through: models.UserAssets,
        foreignKey:'id_asset'
      });

      this.hasOne(models.News, {
        foreignKey: 'main_image',
        as: 'new_image'
     });

      this.hasOne(models.Users, {
        foreignKey: 'photo_profile',
        as: 'image'
     });
    }
  }
  Assets.init({
    ruta: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Assets',
    tableName: 'assets'
  });
  return Assets;
};