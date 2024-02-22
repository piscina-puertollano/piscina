'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Clase extends Model {
    static associate(models) {
      // Define la asociación con el modelo Categoria
      Clase.belongsTo(models.Categoria, {
        foreignKey: 'id_categoria', 
        as: 'categoria'
      });
    }
  }

  Clase.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Clase',
    tableName: 'clase'
  });

  return Clase;
};
