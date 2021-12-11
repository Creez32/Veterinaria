'use strict';
let users = [
  {
    name: "Cristian",
    lastName: "Elias",
    phone: "+54261048911",
    password:"$2a$10$.HdNoojy7hI2SOdcRjo1qOUXMrk4.GzH6Ct1lDJjcLCGX3Hzt2Jdq",
    email: "cristian@gmail.com",
    rolId: 1,
    createdAt: new Date,
    updatedAt: new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', users, {});
  },
  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};