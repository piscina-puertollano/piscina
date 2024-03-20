'use strict';
const {
  Model
} = require('sequelize');

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {

    static associate(models) {
      this.belongsToMany(models.Users, {
         through: models.UserRol,
         foreignKey: 'id_rol',
         otherKey: 'id_user',
        onDelete: 'CASCADE',
        as: 'users'
      });
     }
  }
  Rol.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: process.env.TABLE_ROLS,
    timestamps: false,
  });
  return Rol;
};
