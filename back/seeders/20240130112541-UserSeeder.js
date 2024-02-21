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
        photo_profile: 1,
        password: await bcrypt.hash('1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
          id:2,
          firstName:'prueba',
          lastName: 'tutor',
        photo_profile: 4,
        email: 'tutor@piscina.com',
        password: await bcrypt.hash('1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        firstName:'prueba',
        lastName: 'socio',
        photo_profile: 3,
        email: 'socio@piscina.com',
        password: await bcrypt.hash('1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        firstName:'tutor',
        lastName: 'socio',
        photo_profile: 4,
        email: 'tutorsocio@piscina.com',
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