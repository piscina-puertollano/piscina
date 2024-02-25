'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ejercicioEntrenamiento', [{
      idEjercicio: 1,
      idEntrenamiento: 1
    },
  {
    idEjercicio: 2,
    idEntrenamiento: 1
  },
  {
    idEjercicio: 3,
    idEntrenamiento: 1
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
