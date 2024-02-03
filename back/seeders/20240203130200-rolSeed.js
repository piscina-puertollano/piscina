'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('rols', [
        {
        name: 'admin',
        desc: 'Administrador de todo el dominio'
      },
      {
        name: 'tutor',
        desc: 'Usuario que está acargo de un socio'
      },
      {
        name: 'socio',
        desc: 'Usuario que paga la cuota y es miembro'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('rols', null, {});
  }
};
