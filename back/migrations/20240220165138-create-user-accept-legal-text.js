'use strict';
/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_ACCEPT_TEXT_LEGAL, {
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
    await queryInterface.dropTable(process.env.TABLE_ACCEPT_TEXT_LEGAL);
  }
};