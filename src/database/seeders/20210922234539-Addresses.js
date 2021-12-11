'use strict';
let addresses = [
  {
    direction:"A del Valle",
    number :"865",
    apartament:"",
    country : "Argentina",
    city: "Mendoza",
    location : "Godoy Cruz",
    zipCode : "5501",
    userId: 1,
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
