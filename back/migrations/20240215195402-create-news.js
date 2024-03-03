'use strict';
/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_NEWS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.TEXT
      },
      main_image: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_ASSETS     
          },
          key: 'id'
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_USERS          
          },
          key: 'id'
        }
      },
      share_counter:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }
      ,
      visit_counter:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      likes_counter:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dislikes_counter:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      views_counter:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      duration:{
        type: Sequelize.STRING
      },
      category:{
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
    await queryInterface.dropTable(process.env.TABLE_NEWS);
  }
};