'use strict';
/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_TUTORS, {
      id_tutor: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_USERS          
          },
          key: 'id'
        }
      },
      id_socio: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_USERS          
          },
          key: 'id'
        }
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
    await queryInterface.dropTable(process.env.TABLE_TUTORS);
  }
};