/**
 * @author Marina Laguna
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ejercicio', [{
      idTipo: 1,
      descripcion: '400m (75m crol + 25 Estilo)',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    idTipo: 2,
    descripcion: '100m espalda suave, 2x50 Punto muerto de mariposa con respiración frontal /30”, 6x300m Nado continuo (6 brazadas fuertes cada 50m y  mirar tres veces cada 50m al frente / 45”), 3x200m Aeróbico medio a ritmo con Palas + Aletas /1”',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idTipo: 3,
    descripcion: '200m',
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
