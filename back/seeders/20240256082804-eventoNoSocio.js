// Gonzalo Martinez Haro
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   

    await queryInterface.bulkInsert(process.env.TABLE_EVENTO_NOSOCIO, [{
      idNoSocio: 1,
      idEvento: 1,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    idNoSocio: 2,
    idEvento: 1,
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
