const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', [
        {
        firstName:'admin',
        lastName: 'admin',
        email: 'admin@piscina.com',
        password: await bcrypt.hash('1234', 10),
        isSocio: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:'prueba',
        lastName: 'tutor',
        email: 'tutor@piscina.com',
        password: await bcrypt.hash('1234', 10),
        isSocio: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:'prueba',
        lastName: 'socio',
        email: 'socio@piscina.com',
        password: await bcrypt.hash('1234', 10),
        isSocio: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('users', null, {});
  }
};
