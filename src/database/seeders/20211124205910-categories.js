'use strict';

let categorias = ['Perros','Gatos','Roedores','Aves','Reptiles','Peces']

let categories = categorias.map(categoria => {
  let nuevo = {
    name : categoria,
    createdAt: new Date,
    updatedAt: new Date
  }
  return nuevo
})



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Categories', null, {});
  }
};
