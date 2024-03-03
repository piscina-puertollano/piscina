'use strict';
const {
 Model
} = require('sequelize');

/**
 * @author: badr
 */
module.exports = (sequelize, DataTypes) => {
   class UserRol extends Model {
      static associate(models) {
        UserRol.belongsTo(models.Users, {
          foreignKey: 'id_user',
          as: 'user'
        });
        UserRol.belongsTo(models.Rol, {
          foreignKey: 'id_rol',
          as: 'rol'
        });
      }
   }
   UserRol.init({
      id_user: DataTypes.NUMBER,
      id_rol: DataTypes.NUMBER
   }, {
      sequelize,
      modelName: 'UserRol',
      tableName: 'user_rols',
   });
   return UserRol;
  };
