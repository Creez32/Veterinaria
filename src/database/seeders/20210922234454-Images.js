'use strict';
let imagenes = [
  {
    name: "undefinedProduct.png",
    createdAt: new Date,
    updatedAt: new Date
  }
]
 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Images', imagenes, {});
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Images', null, {});
    
  }
};
