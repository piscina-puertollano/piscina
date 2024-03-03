'use strict';

/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(process.env.TABLE_ASSETS, [
      {
        id:1,
        ruta:'54911d38-f5c8-4901-8cf4-d0d6c55b83d6.jpg',
        public:false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
      {
        id:2,
        public:false,
        ruta:'421171e0-e312-448b-94f9-e67668da416e.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id:3,
      public:false,
      ruta:'627b0d25-b196-414a-bca6-ff68571b3fc4.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    id:4,
    public:false,
    ruta:'b1cdad2f-2f8b-451e-ab61-eba06844ea8b.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id:5,
    public:false,
    ruta:'01295ddb-674f-46ab-b73a-74153d97b587.pdf',
    createdAt: new Date(),
    updatedAt: new Date()
  }
    
  ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete(process.env.TABLE_ASSETS, null, {});
  }
};
