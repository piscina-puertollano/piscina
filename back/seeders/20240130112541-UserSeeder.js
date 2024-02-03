const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', [
      {
        firstName:'prueba',
        lastName: 'prueba',
        email: 'prueba@piscina.com',
        password: await bcrypt.hash('1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('users', null, {});
  }
};