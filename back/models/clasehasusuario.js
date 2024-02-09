'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
  class ClaseHasUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClaseHasUsuario.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: DataTypes.INTEGER,
    id_clase: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'clase_has_usuario',
    tableName: 'clase_has_usuario',
    freezeTableName: true,
    timestamps: false
  });
  return ClaseHasUsuario;
};
