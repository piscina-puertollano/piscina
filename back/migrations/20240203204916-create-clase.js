'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clase', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      nombre: { // Campo para el nombre de la clase
        type: Sequelize.STRING,
        allowNull: false // Puedes cambiar esto a true si quieres permitir valores nulos
      },

      categoria_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id',
        },
      },
     
      hora_inicio: {
        type: Sequelize.TIME,
        allowNull: false
      },

      hora_fin: {
        type: Sequelize.TIME,
        allowNull: false 
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
    await queryInterface.dropTable('clase');
  }
};
