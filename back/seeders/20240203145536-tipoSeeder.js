/**
 * @author Marina Laguna
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_TIPO_EJERCICIOS, [{
      nombre: 'calentamiento',
      descripcion: 'El propósito principal del calentamiento es aumentar la temperatura corporal, mejorar la circulación sanguínea, flexibilizar los músculos y articulaciones, y activar el sistema cardiovascular.',
    },
    {
      nombre: 'principal',
      descripcion: 'Durante el ejercicio principal, se suelen realizar movimientos y actividades más desafiantes, con una mayor intensidad y enfoque en la carga de trabajo específica para lograr los beneficios deseados.',
    },
    {
      nombre: 'relax',
      descripcion: 'La fase de relajación al final del entrenamiento, también conocida como enfriamiento, generalmente incluye ejercicios diseñados para reducir la frecuencia cardíaca, relajar los músculos y facilitar la transición del cuerpo de una actividad física intensa a un estado de reposo. '
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
