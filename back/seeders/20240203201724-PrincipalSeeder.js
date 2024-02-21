/**
 * author: Marina Laguna
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('principal', [{
      ejercicio: `100m espalda suave, 2x50 punto muerto mariposa con respiracion frontal / 30”, 6x300m nado continuo (6 brazadas fuertes cada 50m y mirar tres veces cada 50m al frente /45”, 3x200m aeróbico medio a ritmo con Palas + Aletas /1”)`,
      createdAt: new Date(),
      updatedAt: new Date()
     }])
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
