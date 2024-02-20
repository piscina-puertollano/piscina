'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ejercicio', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCalentamiento: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'calentamiento'
          },
          key: 'id'
        },
        allowNull: false
      },
      idPrincipal: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'principal'
          },
          key: 'id'
        },
        allowNull: false
      },
      idRelax: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'relax'
          },
          key: 'id'
        },
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
    await queryInterface.dropTable('ejercicio');
  }
};