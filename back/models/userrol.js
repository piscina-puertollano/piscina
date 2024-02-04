'use strict';
const {
 Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class UserRol extends Model {}
 UserRol.init({
  id_user: DataTypes.NUMBER,
  id_rol: DataTypes.NUMBER
 }, {
    sequelize,
    modelName: 'UserRol',
    tableName: 'user_rols', // Assuming you have a 'user_roles' table in your database
 });
 return UserRol;
};
