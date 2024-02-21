'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_alergias', {
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
      id_alergia: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'alergias'          
          },
          key: 'id'
        },
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
    await queryInterface.dropTable('user_alergias');
  }
};