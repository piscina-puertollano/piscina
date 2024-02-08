'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('rols', [
        {
          id:1,
        name: 'admin',
        desc: 'Administrador de todo el dominio'
      },
      {
        id:2,
        name: 'tutor',
        desc: 'Usuario que está acargo de un socio'
      },
      {
        id:3,
        name: 'socio',
        desc: 'Usuario que paga la cuota y es miembro'
      },
      {
        id:4,
        name: 'entrenador',
        desc: 'Usuario que entrena a los socios'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('rols', null, {});
  }
};
