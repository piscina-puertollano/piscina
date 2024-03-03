"use strict";
const { Model } = require("sequelize");

/**
 * @author: badr
 */

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.News, {
        foreignKey: "id",
        as: "comment_new",
      });
      this.hasMany(models.Comments, {
        foreignKey: "respond_to",
      });

      this.belongsTo(models.Users, {
        foreignKey: "id_user",
        as: "user_comments",
      });
    }
  }
  Comments.init(
    {
      id_new: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      author: DataTypes.INTEGER,
      respond_to: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
      tableName: process.env.TABLE_COMMENTS
    }
  );
  return Comments;
};
