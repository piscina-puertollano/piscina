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
      // Define associations here
      // For example, if Faltas belongs to Users and Clase
      // this.belongsTo(models.Users, {
      //   foreignKey: 'id_usuario',
      //   as: 'usuario'
      // });
      // this.belongsTo(models.Clase, {
      //   foreignKey: 'id_clase',
      //   as: 'clase'
      // });
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
    },
    fecha: {
      allowNull: false,
      type: DataTypes.DATE,
    }
    
  }, {
    sequelize,
    modelName: 'faltas',
    timestamps: false, 
    underscored: true, 
    freezeTableName: true, 
  });
  return Faltas;
};
