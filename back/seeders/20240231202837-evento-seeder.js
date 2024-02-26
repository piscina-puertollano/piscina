// Gonzalo Martinez Haro
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('eventos', [{
        nombre: '24H',
        fecha: '2024/05/12',
        sede: 'Puertollano',
        idCategoria: 3,
        visible: true,
        privado: false,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      nombre: 'Nadar sin brazos y sin piernas',
      fecha: '2024/05/30',
      sede: 'Puertollano',
      idCategoria: 1,
      visible: false,
      privado: true,
      createdAt: new Date(),
      updatedAt: new Date()
   },
    ], {});
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
