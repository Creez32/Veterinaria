'use strict';

let productos = require('../../data/product.json')

let imagenes = productos.map((producto,index) => {
  let nuevo = {
    file : producto.imagen,
    productsId: index + 1,
    createdAt: new Date,
    updatedAt: new Date
  }
  return nuevo
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Images', imagenes, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Images', null, {});
  }
};
