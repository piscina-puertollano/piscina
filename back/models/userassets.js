'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAssets extends Model {

    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'id_user'
      });
      this.belongsTo(models.Assets, {
        foreignKey: 'id_asset'
      });
    }
  }
  UserAssets.init({
    id_user: DataTypes.INTEGER,
    id_asset: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserAssets',
    tableName: 'user_assets'
  });
  return UserAssets;
};