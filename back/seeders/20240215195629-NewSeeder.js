'use strict';

const { newsFactory } = require('../factories/newsFactory');

/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(process.env.TABLE_NEWS, [
      {
      id:1,
      title:'Nueva página!!',
      body: 'Le damos la bienvenida a la nueva página',
      id_user:1,
      main_image:1,
      visit_counter: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});

  let factoryNews = await newsFactory(10)
  await queryInterface.bulkInsert(process.env.TABLE_NEWS, factoryNews, {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete(process.env.TABLE_NEWS, null, {});
  }
};
