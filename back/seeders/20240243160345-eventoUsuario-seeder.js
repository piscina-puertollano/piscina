// Gonzalo Martinez Haro
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert(process.env.TABLE_EVENTO_USUARIO, [{
      idUsuario: 1,
      idEvento: 1,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    idUsuario: 1,
    idEvento: 2,
    createdAt: new Date(),
    updatedAt: new Date()
 },
 {
  idUsuario: 2,
  idEvento: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  idUsuario: 2,
  idEvento: 3,
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
