'use strict';
let addresses = [
  {
    direction:"Mi casa",
    number :"123",
    apartament:"1",
    country : "Argentina",
    city: "Godoy Cruz",
    location : "Mendoza",
    zipCode : "5501",
    createdAt: new Date,
    updatedAt: new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Addresses', addresses, {});
  },
  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Addresses', null, {});
  }
};
