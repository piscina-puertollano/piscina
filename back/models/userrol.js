'use strict';
const {
 Model
} = require('sequelize');

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
 class UserRol extends Model {}
 UserRol.init({
  id_user: DataTypes.NUMBER,
  id_rol: DataTypes.NUMBER
 }, {
    sequelize,
    modelName: 'UserRol',
    tableName: process.env.TABLE_USER_ROLS,
 });
 return UserRol;
};
