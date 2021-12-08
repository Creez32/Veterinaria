'use strict';

let roles = [
  {
    name : 'admin',
    createdAt: new Date,
    updatedAt: new Date
  },
  {
    name : 'user',
    createdAt: new Date,
    updatedAt: new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Rols', roles, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Rols', null, {});
     
  }
};
