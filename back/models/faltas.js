'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Faltas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Faltas.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_usuario: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',  
        key: 'id'
      }
    },
    id_clase: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'clase',  
        key: 'idclase'
      }
    }
    // No se necesitan campos 'createdAt' y 'updatedAt' ya que Sequelize los busca por defecto
  }, {
    sequelize,
    modelName: 'faltas',
    timestamps: false, 
    underscored: true, 
    freezeTableName: true, 
  });
  return Faltas;
};
