/**
 * @author Marina Laguna
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ejercicioEntrenamiento', [{
      ejercicioId: 1,
      idEntrenamiento: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    ejercicioId: 2,
    idEntrenamiento: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    ejercicioId: 3,
    idEntrenamiento: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
