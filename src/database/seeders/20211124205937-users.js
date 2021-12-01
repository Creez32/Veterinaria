'use strict';

let user = [
  {
    id: 1,
    name: 'Cristian',
    lastName: 'Elias',
    email: 'cristian@gmail.com',
    password: '$2a$10$LZjitt78iv9ovqALSz0Tte5hJWPH9lX.U7N86wxW59r7g7kZOJXYW',
    avatar: 'img-1631406262238.jpeg',
    addressId: 1,
    rolId: 1,
    createdAt: new Date,
    updatedAt: new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', user, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', null, {});
  }
};
