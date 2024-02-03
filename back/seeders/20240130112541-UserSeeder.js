'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
        firstName: 'Benito',
        lastName: 'Camelas',
        email: 'benitocamelas@gmail.com',
        password: 'benitokmelas',
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
