'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {
      this.belongsToMany(models.Rol, {
         through: models.UserRol,
         foreignKey: 'id_user',
         otherKey: 'id_rol',
         as: 'roles',
        onDelete: 'CASCADE'
      });
     }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isSocio: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Users',
    tableName:'users'
  });
  return Users;
};