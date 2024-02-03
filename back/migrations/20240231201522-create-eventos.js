'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.STRING
      },
      sede: {
        type: Sequelize.STRING
      },
      idCategoria: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'categorias'
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
    await queryInterface.dropTable('eventos');
  }
};