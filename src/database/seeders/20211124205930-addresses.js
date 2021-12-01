'use strict';

let addresses = [
  {
    direction:'A del Valle',
    number: 855,
    apartament: '',
    country: 'Argentina',
    city:'Mendoza',
    location:'Godoy Cruz',
    zipCode:5501,
    createdAt: new Date,
    updatedAt: new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Adresses', addresses, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Adresses', null, {});
  }
};

