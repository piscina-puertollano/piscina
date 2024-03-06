'use strict';
/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_COMMENTS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      id_new:{
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_NEWS,
            onDelete: "cascade"

          },
          key: 'id'
        }
      },
      author: {
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
    await queryInterface.dropTable(process.env.TABLE_COMMENTS);
  }
};