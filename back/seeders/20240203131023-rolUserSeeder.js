'use strict';

const models = require('../models/index.js');

/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
 async up (queryInterface, Sequelize) {
    try {
      const adminUser = await models.Users.findOne({ where: { email: 'admin@piscina.com' } });
      const tutorUser = await models.Users.findOne({ where: { email: 'tutor@piscina.com' } });
      const socioUser = await models.Users.findOne({ where: { email: 'socio@piscina.com' } });
      const turorSocioUser = await models.Users.findOne({ where: { email: 'tutorsocio@piscina.com' } });
      const entrenadorUser = await models.Users.findOne({ where: { email: 'entrenador@piscina.com' }});

      const adminRole = await models.Rol.findOne({ where: { name: 'admin' } });
      const tutorRole = await models.Rol.findOne({ where: { name: 'tutor' } });
      const socioRole = await models.Rol.findOne({ where: { name: 'socio' } });
      const entrenadorRole = await models.Rol.findOne({ where: { name: 'entrenador' }});

      await adminUser.setRoles(adminRole);
      await socioUser.setRoles(socioRole);
      await tutorUser.setRoles(tutorRole);
      await turorSocioUser.setRoles([socioRole,tutorRole]);
      await entrenadorUser.setRoles([entrenadorRole]);


    } catch (error) {
      console.error(error);
    }
 },
 async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('user_rols', null, {});
}
};