'use strict';

const models = require('../models/index.js');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
 async up (queryInterface, Sequelize) {
    try {
      const adminUser = await models.Users.findOne({ where: { email: 'admin@piscina.com' } });
      const tutorUser = await models.Users.findOne({ where: { email: 'tutor@piscina.com' } });
      const socioUser = await models.Users.findOne({ where: { email: 'socio@piscina.com' } });

      const adminRole = await models.Rol.findOne({ where: { name: 'admin' } });
      const tutorRole = await models.Rol.findOne({ where: { name: 'tutor' } });
      const socioRole = await models.Rol.findOne({ where: { name: 'socio' } });

      await adminUser.setRoles(adminRole);
      await socioUser.setRoles(socioRole);
      await tutorUser.setRoles(tutorRole);


    } catch (error) {
      console.error(error);
    }
 },
 async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('user_rols', null, {});
}
};