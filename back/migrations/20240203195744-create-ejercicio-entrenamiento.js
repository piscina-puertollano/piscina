/**
 * @author Marina Laguna
 */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ejercicioEntrenamiento', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ejercicioId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'ejercicio',
          },
          key: 'id',
        },
        allowNull: false,
      },
      idEntrenamiento: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'entrenamientos',
          },
          key: 'id',
        },
        allowNull: false,
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
    await queryInterface.dropTable('ejercicioEntrenamiento');
  }
};