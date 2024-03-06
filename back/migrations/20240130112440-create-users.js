'use strict';
/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(process.env.TABLE_USERS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      photo_profile: {
        defaultValue: 1,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: process.env.TABLE_ASSETS
          },
          key: 'id'
        },
        
      },
      num_socio: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        unique:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull:true
      },
      tlf: {
        type: Sequelize.STRING,
        allowNull:true
      },
      domicilio: {
        type: Sequelize.STRING,
        allowNull:true
      },
      corriente_pago: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
        defaultValue: 1
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: 1,
      },
      born_date: {
        type: Sequelize.DATE,
        allowNull:true
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
    await queryInterface.dropTable(process.env.TABLE_USERS);
  }
};