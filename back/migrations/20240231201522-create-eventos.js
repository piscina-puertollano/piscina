// Gonzalo Martinez Haro
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_EVENTOS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fecha: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sede: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idCategoria: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: process.env.TABLE_CATEGORIAS
          },
          key: 'id'
        },
        allowNull: false
      },
      visible: {
        type: Sequelize.BOOLEAN
      },
      privado: {
        type: Sequelize.BOOLEAN
      },
      resultado: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_ASSETS  
          },
          key: 'id'
        },
      },
      desc: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(process.env.TABLE_EVENTOS);
  }
};