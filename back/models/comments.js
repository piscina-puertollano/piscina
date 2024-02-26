'use strict';
const {
  Model
} = require('sequelize');

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
     this.hasMany(models.Comments, 
      {foreignKey: 'respond_to'});

      this.belongsTo(models.Users, {
        foreignKey: 'id_user',
        as:'user_comments'
      })
    }
  }
  Comments.init({
    comment: DataTypes.TEXT,
    respond_to: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};