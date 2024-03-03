'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('respond_comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      respond_to: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'users'
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
    await queryInterface.dropTable('respond_comments');
  }
};