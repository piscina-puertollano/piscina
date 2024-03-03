'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert(process.env.TABLE_CATEGORIA_CLASES, [{
      nombre: 'Infantil',
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    nombre: 'Alevin',
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    nombre: 'Cadete',
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    nombre: 'Master',
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
