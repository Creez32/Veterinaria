'use strict';
let productos = require('../../data/product.json')
 let products = productos.map(product =>{ 
  let coso = {
    name: product.nombre,
    price : product.precio,
    description : product.descripcion,
    stock : product.stock,
    categoryId: 1,
    varietyId: 1,
    imageId: 1,
    createdAt: new Date,
    updatedAt: new Date
  }
  return coso
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Products', null, {});
    
  }
};