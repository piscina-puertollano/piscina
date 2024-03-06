'use strict';

const models = require('../models');

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
      const menorUser = await models.Users.findOne({ where: { email: 'menor@piscina.com' }});

      const adminRole = await models.Rol.findOne({ where: { name: 'admin' } });
      const tutorRole = await models.Rol.findOne({ where: { name: 'tutor' } });
      const socioRole = await models.Rol.findOne({ where: { name: 'socio' } });
      const entrenadorRole = await models.Rol.findOne({ where: { name: 'entrenador' }});
      

      await adminUser.setRoles(adminRole);
      await socioUser.setRoles(socioRole);
      await tutorUser.setRoles(tutorRole);
      await turorSocioUser.setRoles([socioRole,tutorRole]);
      await entrenadorUser.setRoles([entrenadorRole]);
      await menorUser.setRoles(socioRole)


    } catch (error) {
      console.error(error);
    }
 },
 async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete(process.env.TABLE_USER_ROLS, null, {});
}
};