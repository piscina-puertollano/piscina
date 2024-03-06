const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert(process.env.TABLE_USERS, [
        {
          id:1,
        firstName:'admin',
        lastName: 'admin',
        email: 'admin@piscina.com',
        photo_profile: 1,
        num_socio: null,
        corriente_pago:1,
        born_date: new Date('2000-01-01'),
        domicilio: '403691.30310115 4282638.6555873',
        password: await bcrypt.hash('1234', 10),

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
          id:2,
          firstName:'prueba',
          lastName: 'tutor',
        photo_profile: 2,
        email: 'tutor@piscina.com',
        password: await bcrypt.hash('1234', 10),
        num_socio: null,
        corriente_pago:1,
        born_date: new Date('2000-01-01'),
        domicilio: '403691.30310115 4282638.6555873',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        firstName:'prueba',
        lastName: 'socio',
        photo_profile: 3,
        email: 'socio@piscina.com',
        num_socio: null,
        corriente_pago:1,
        born_date: new Date('2000-01-01'),
        domicilio: '403691.30310115 4282638.6555873',
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
        num_socio: null,
        corriente_pago:1,
        born_date: new Date('2000-01-01'),
        domicilio: '403691.30310115 4282638.6555873',
        password: await bcrypt.hash('1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:5,
        firstName:'entrenador',
        lastName: 'entrenador',
        photo_profile: 5,
        email: 'entrenador@piscina.com',
        num_socio: null,
        corriente_pago:1,
        born_date: new Date('2000-01-01'),
        domicilio: '403691.30310115 4282638.6555873',
        password: await bcrypt.hash('1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:6,
        firstName:'socioMenor',
        lastName: 'socio',
        photo_profile: 3,
        email: 'socio@piscina.com',
        num_socio: null,
        corriente_pago:1,
        born_date: new Date('2020-01-01'),
        domicilio: '403691.30310115 4282638.6555873',
        password: await bcrypt.hash('1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete(process.env.TABLE_USERS, null, {});
  }
};