"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class respond_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Comments, { 
        foreignKey: "respond_to",
        as: "comment"
       });
       this.belongsTo(models.Comments, { 
        foreignKey: "id_comment",
        as: "respond_author"
       });
    }
  }
  respond_comment.init(
    {
      respond_to: DataTypes.INTEGER,
      id_comment: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "respond_comment",
      tableName: process.env.TABLE_COMMENTS_RESPOND,
    }
  );
  return respond_comment;
};
