// Gonzalo Martinez Haro
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_EVENTO_NOSOCIO, {
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
            tableName: process.env.TABLE_NOSOCIOs
          },
          key: 'id'
        },
        allowNull: false
      },
      idEvento: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: process.env.TABLE_EVENTOS
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
    await queryInterface.dropTable(process.env.TABLE_EVENTO_NOSOCIO);
  }
};