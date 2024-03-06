'use strict';
/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_ASSETS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ruta: {
        allowNull: false,
        type: Sequelize.STRING
      },
      public:{
        type: Sequelize.BOOLEAN,
        defaultValue:false,
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
    await queryInterface.dropTable(process.env.TABLE_ASSETS);
  }
};