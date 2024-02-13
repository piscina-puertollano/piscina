'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assets extends Model {

    static associate(models) {

      this.belongsToMany(models.Users, {
        through: models.UserAssets,
        foreignKey:'id_asset'
      });


      this.hasOne(models.Users, {
        foreignKey: 'photo_profile',
        as: 'image'
     });
    }
  }
  Assets.init({
    ruta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Assets',
    tableName: 'assets'
  });
  return Assets;
};