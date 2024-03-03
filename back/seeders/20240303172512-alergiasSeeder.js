'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(process.env.TABLE_ALERGIAS, [
        {
        name: 'Ibuprofeno',
      },
      {
        name: 'Latex',
      },
      {
        name: 'Frutos secos',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(process.env.TABLE_ALERGIAS, null, {});
  }
};
