"use strict";

/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      process.env.TABLE_ROLS,
      [
        {
          id: process.env.ID_ROL_ADMIN,
          name: "admin",
          desc: "Administrador de todo el dominio",
        },
        {
          id: process.env.ID_ROL_TUTOR,
          name: "tutor",
          desc: "Usuario que está acargo de un socio",
        },
        {
          id: process.env.ID_ROL_SOCIO,
          name: "socio",
          desc: "Usuario que paga la cuota y es miembro",
        },
        {
          id: process.env.ID_ROL_TRAINER,
          name: "entrenador",
          desc: "Usuario que entrena a los socios",
        },
        {
          id: process.env.ID_ROL_REDACTOR,
          name: "redactor",
          desc: "Usuario que solo se encarga de redactar noticias",
        },
        {
          id: process.env.ID_ROL_WEBMASTER,
          name: "webmaster",
          desc: "Usuario que se encarga de la gestión de la web, editar la historia, la forma de contactar, y subir ficheros a eventos y a la parte de asambleas ",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(process.env.TABLE_ROLS, null, {});
  },
};
