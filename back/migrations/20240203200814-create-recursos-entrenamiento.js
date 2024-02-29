/**
 * @author: Marina Laguna
 */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recursosEntrenamientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idEntrenamiento: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'entrenamientos'
          },
          key: 'id'
        },
        allowNull: false
      },
      asset_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('recursosEntrenamientos');
  }
};