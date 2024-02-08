const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', [
        {
          id:1,
        firstName:'admin',
        lastName: 'admin',
        email: 'admin@piscina.com',
        password: await bcrypt.hash('1234', 10),
        isSocio: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
          id:2,
          firstName:'prueba',
        lastName: 'tutor',
        email: 'tutor@piscina.com',
        password: await bcrypt.hash('1234', 10),
        isSocio: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        firstName:'prueba',
        lastName: 'socio',
        email: 'socio@piscina.com',
        password: await bcrypt.hash('1234', 10),
        isSocio: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        firstName:'tutor',
        lastName: 'socio',
        email: 'tutorsocio@piscina.com',
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