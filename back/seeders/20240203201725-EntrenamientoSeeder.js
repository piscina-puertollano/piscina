/**
 * @author Marina Laguna
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_ENTRENAMIENTOS, [{
      nombre: '3000 metros',
      descripcion: 'Entrenamiento de 3000 metros en las Lagunas de Ruidera.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Entrenamiento de Natación',
      descripcion: 'Entrenamiento de natación de resistencia y velocidad en piscina. Incluye series de estilos libres, espalda, pecho y braza, con intervalos de descanso y calentamiento.',
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
