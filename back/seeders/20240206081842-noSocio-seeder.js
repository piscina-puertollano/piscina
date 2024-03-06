// Gonzalo Martinez Haro
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert(process.env.TABLE_NOSOCIOS, [{

      nombre: 'Juan',
      apellidos: 'Cuesta',
      email: 'Juan@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    nombre: 'Emilio',
    apellidos: 'nose',
    email: 'Emilio@gmail.com',
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
