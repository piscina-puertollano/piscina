'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('users', [{
        nombre: '24H',
        fecha: new Date('2024/05/12').toISOString(),
        sede: 'Puertollano',
        categoria: 'Todos',
        visible: true,
        privado: false
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
