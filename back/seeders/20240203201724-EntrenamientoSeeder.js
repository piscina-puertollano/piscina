'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('entrenamientos', [{
      nombre: 'Resistencia Acuática',
      descripcion: 'Este entrenamiento se enfoca en mejorar la resistencia cardiovascular y muscular en el agua. Incluye series de nado continuo y variaciones de velocidad para fortalecer y tonificar los músculos.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Fuerza Acuática',
      descripcion: 'Combina ejercicios de resistencia con actividades de fortalecimiento muscular en el agua. Se centra en mejorar la fuerza general del cuerpo y la capacidad de resistencia para un rendimiento óptimo.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Natación Regenerativa',
      descripcion: 'Diseñado para la recuperación activa, este entrenamiento incluye técnicas de nado suave, ejercicios de estiramiento en el agua y actividades de baja intensidad para mejorar la flexibilidad y reducir la tensión muscular.',
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
