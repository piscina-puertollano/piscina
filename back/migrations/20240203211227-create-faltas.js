'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('faltas', {
       idfaltas: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
       },
       usuario_idusuario: {
         allowNull: false,
         type: Sequelize.INTEGER,
         references: {
           model: 'Users',
           key: 'id'
         }
       },
       clase_idclase: {
         allowNull: false,
         type: Sequelize.INTEGER,
         references: {
           model: 'Clase',
           key: 'idclase'
         }
       }
     });
  },
  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('faltas');
  }
 };
 