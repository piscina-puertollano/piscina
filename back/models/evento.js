// Gonzalo Martinez Haro
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
        this.hasMany(models.EventoUsuario, {
          foreignKey: 'idEvento',
          as: 'eventosUsuarios'
        });
      
       
        this.hasMany(models.EventoNoSocio, {
          foreignKey: 'idEvento',
          as: 'eventosNoSocios'
        });
      
       
        this.belongsTo(models.Categoria, {
          foreignKey: 'idCategoria',
          as: 'categoria'
        });

        this.hasOne(models.Assets, {
          foreignKey: 'id',
          sourceKey: 'resultado',
          as: 'pdf'
        });
      
    }
  }
  Evento.init({
    nombre: DataTypes.STRING,
    fecha: DataTypes.STRING,
    sede: DataTypes.STRING,
    idCategoria: DataTypes.INTEGER,
    visible: DataTypes.BOOLEAN,
    privado: DataTypes.BOOLEAN,
    resultado: DataTypes.INTEGER,
    desc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Evento',
    tableName: process.env.TABLE_EVENTOS
  });
  return Evento;
};