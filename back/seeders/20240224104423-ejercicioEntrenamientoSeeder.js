/**
 * @author Marina Laguna
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_EJERCICIO_ENTRENAMIENTO, [{
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
  },
  {
    ejercicioId: 4,
    idEntrenamiento: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    ejercicioId: 5,
    idEntrenamiento: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    ejercicioId: 6,
    idEntrenamiento: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
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
