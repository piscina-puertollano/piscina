'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_accept_legal_texts', {
      id_user: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'users'          
          },
          key: 'id'
        },
      },
      id_legal_text: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'legal_texts'          
          },
          key: 'id'
        },
      },
      acceptedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_accept_legal_texts');
  }
};