'use strict';
let productos = require('../../data/product.json')

let productosNuevos = productos.map((producto) => {

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let nuevo = {
    name : producto.nombre,
    brand : producto.variedad,
    description: producto.descripcion,
    price:producto.precio,
    discount:random(5,50),
    edad:producto.edad,
    peso:producto.cantidadPeso,
    stock:producto.stock,
    categoryId:random(1,8),
    varietyId:random(1,8),
    createdAt: new Date,
    updatedAt: new Date
  }
  return nuevo
})
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', productosNuevos, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Products', null, {});
  }
};