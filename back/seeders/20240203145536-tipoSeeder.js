'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipo', [{
      nombre: 'calentamiento',
      descripcion: '400m (75m crol + 25 Estilo)',
    },
    {
      nombre: 'principal',
      descripcion: '100m espalda suave, 2x50 Punto muerto de mariposa con respiración frontal /30”, 6x300m Nado continuo (6 brazadas fuertes cada 50m y  mirar tres veces cada 50m al frente / 45”), 3x200m Aeróbico medio a ritmo con Palas + Aletas /1”',
    },
    {
      nombre: 'relax',
      descripcion: '200m'
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
