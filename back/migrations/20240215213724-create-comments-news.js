'use strict';
/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments_news', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_new: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'news'          
          },
          key: 'id'
        }
      },
      id_comment: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'comments'          
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
    await queryInterface.dropTable('comments_news');
  }
};