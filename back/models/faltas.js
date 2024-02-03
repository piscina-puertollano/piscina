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
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: 'usuario_idusuario',
        as: 'usuario'
      });
      this.belongsTo(models.Clase, {
        foreignKey: 'clase_idclase',
        as: 'clase'
      });
    }
 }
 Faltas.init({
    idfaltas: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    usuario_idusuario: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', 
        key: 'id'
      }
    },
    clase_idclase: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'clase', 
        key: 'idclase'
      }
    }
 }, {
    sequelize,
    modelName: 'faltas',
 });
 return Faltas;
};
