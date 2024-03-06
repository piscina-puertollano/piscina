//Manuel Garcia
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Clase extends Model {
    /*static associate(models) {
      Clase.belongsTo(models.Categoria, {
        foreignKey: 'id_categoria', 
        as: 'categoria'
      });
    }*/
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
      type: DataTypes.STRING,
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
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
    modelName: process.env.TABLE_CLASES,
    tableName: process.env.TABLE_CLASES
  });

  return Clase;
};
