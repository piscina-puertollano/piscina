// Gonzalo Martinez Haro
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert(process.env.TABLE_CATEGORIAS, [{
      nombre: 'MASTER',
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    nombre: 'NADADOR',
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    nombre: 'TODOS',
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
