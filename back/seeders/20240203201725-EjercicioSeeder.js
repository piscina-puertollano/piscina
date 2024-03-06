/**
 * @author Marina Laguna
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_EJERCICIOS, [{
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
    },
    {
      idTipo: 1,
      descripcion: '50m Punto muerto de mariposa, 50m Punto muerto de pecho, 50m Punto muerto de espalda, 50m Punto muerto de braza',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idTipo: 2,
      descripcion: '200m Nado libre, 200m Nado mariposa, 200m Nado pecho, 200m Nado espalda, 200m Nado braza',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idTipo: 3,
      descripcion: '100m Nado continuo, 100m Nado de combinación (braza + pecho + espalda + estilos)',
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
