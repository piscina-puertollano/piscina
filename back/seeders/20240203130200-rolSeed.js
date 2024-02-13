'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('rols', [
        {
          id:process.env.ID_ROL_ADMIN,
        name: 'admin',
        desc: 'Administrador de todo el dominio'
      },
      {
        id:process.env.ID_ROL_TUTOR,
        name: 'tutor',
        desc: 'Usuario que está acargo de un socio'
      },
      {
        id:process.env.ID_ROL_SOCIO,
        name: 'socio',
        desc: 'Usuario que paga la cuota y es miembro'
      },
      {
        id:process.env.ID_ROL_TRAINER,
        name: 'entrenador',
        desc: 'Usuario que entrena a los socios'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('rols', null, {});
  }
};
