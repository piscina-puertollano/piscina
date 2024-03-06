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
      this.belongsTo(models.News, {
        foreignKey: "id",
        as: "news",
        onDelete: "cascade"
      });
      this.hasMany(models.respond_comment, {
        foreignKey: "id_comment",
        as: "comment_respond",
     });

     this.hasMany(models.respond_comment, {
      foreignKey: "id",
      as: "respond_comment",
   });

      this.belongsTo(models.Users, {
        foreignKey: "id",
        as: "user_comments",
      });
    }
  }
  Comments.init(
    {
      id_new: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      author: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
      tableName: process.env.TABLE_COMMENTS,
    }
  );
  return Comments;
};
