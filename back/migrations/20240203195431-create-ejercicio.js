/**
 * @author Marina Laguna
 */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_EJERCICIOS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTipo: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: process.env.TABLE_TIPO_EJERCICIOS
          },
          key: 'id'
        },
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable(process.env.TABLE_EJERCICIOS);
  }
};