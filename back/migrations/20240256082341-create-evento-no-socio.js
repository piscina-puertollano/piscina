'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('eventoNoSocios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idNoSocio: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'noSocios'
          },
          key: 'id'
        },
        allowNull: false
      },
      idEvento: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'eventos'
          },
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('eventoNoSocios');
  }
};