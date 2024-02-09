'use strict';
const { Model } = require('sequelize');
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

      this.belongsToMany(models.Users, {
        through: models.TutorUser,
        foreignKey: 'id_tutor',
        otherKey: 'id_socio',
        as: 'socios'
      });

      this.belongsToMany(models.Users, {
        through: models.TutorUser,
        foreignKey: 'id_socio',
        otherKey: 'id_tutor',
        as: 'tutores'
      });

     }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
  });
  return Users;
};