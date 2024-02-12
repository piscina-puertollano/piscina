'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('assets', [
      {
        id:1,
      ruta:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKwciIK-5fa0Bz8LaUKjtcN05kVZqjeCBaE7bLXIPVWw&s',
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
