"use strict";
const { Model } = require("sequelize");

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.belongsToMany(models.Rol, {
        through: models.UserRol,
        foreignKey: "id_user",
        otherKey: "id_rol",
        as: "roles",
        onDelete: "CASCADE",
      });

      this.belongsToMany(models.Assets, {
        through: models.UserAssets,
        foreignKey: "id_user",
      });

      this.belongsToMany(models.Users, {
        through: models.TutorUser,
        foreignKey: "id_tutor",
        otherKey: "id_socio",
        as: "socios",
      });

      this.belongsToMany(models.Users, {
        through: models.TutorUser,
        foreignKey: "id_socio",
        otherKey: "id_tutor",
        as: "tutores",
      });

      this.hasOne(models.Assets, {
        foreignKey: "id",
        sourceKey: "photo_profile",
        as: "image",
      });

      this.hasMany(models.News, {
        foreignKey: "id_user",
        as: "news",
      });

      this.hasMany(models.Comments, {
        foreignKey: "author",
        as: "comments",
      });

      // this.hasMany(models.respond_comment, {
      //   foreignKey: "respond_to",
      //   as: "user_respond",
      // });

      Users.hasMany(models.PuntuacionUsuario, {
        foreignKey: "id_user",
        as: "puntuacionesUsuario",
      });
    }
  }
  Users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      photo_profile: DataTypes.INTEGER,
      num_socio: DataTypes.STRING,
      corriente_pago: DataTypes.BOOLEAN,
      born_date: DataTypes.DATE,
      domicilio: DataTypes.STRING,
      tlf: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Users",
      tableName: process.env.TABLE_USERS,
    }
  );
  return Users;
};
