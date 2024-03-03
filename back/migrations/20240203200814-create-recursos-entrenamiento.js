/**
 * @author Marina Laguna
 */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_RECURSOS_ENTRENAMIENTO, {
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
            tableName: process.env.TABLE_ENTRENAMIENTOS
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
    await queryInterface.dropTable(proces.env.TABLE_RECURSOS_ENTRENAMIENTO);
  }
};