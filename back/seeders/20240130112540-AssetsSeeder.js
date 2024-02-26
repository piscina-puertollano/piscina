'use strict';

/** @type {import('sequelize-cli').Migration} */
/**
 * @author: badr
 */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('assets', [
      {
        id:1,
        ruta:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKwciIK-5fa0Bz8LaUKjtcN05kVZqjeCBaE7bLXIPVWw&s',
        public:false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
      {
        id:2,
        public:false,
        ruta:'https://fastly.picsum.photos/id/739/200/200.jpg?hmac=vjkuMOuAEhToH9GIXkmBicl7sUqPZ3k4rRHh6sQJWZ8',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id:3,
      public:false,
      ruta:'https://fastly.picsum.photos/id/54/200/200.jpg?hmac=-2_HX5umbAEVPP9CokmPW3Kc8V9iDplneKlS73LWdQQ',
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    id:4,
    public:false,
    ruta:'https://fastly.picsum.photos/id/460/200/200.jpg?hmac=hL3I5G2p0p6vDGPyV9hergug-KipbUJVxqnnGIEBXg4',
    createdAt: new Date(),
    updatedAt: new Date()
  }
    
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
