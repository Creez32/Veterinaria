'use strict';

let productos = require('../../data/product.json')

let colores = ['rojo','azul','verde','amarillo','blanco','negro','naranja','rosa','marron']

let colors = productos.map((producto,index) => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  let nuevo = {
    nombre : colores[random(0,8)],
    productsId: index + 1,
    createdAt: new Date,
    updatedAt: new Date
  }
  return nuevo
})
let colors1 = productos.map((producto,index) => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  let nuevo = {
    nombre : colores[random(0,8)],
    productsId: index + 1,
    createdAt: new Date,
    updatedAt: new Date
  }
  return nuevo
})
let colors2 = productos.map((producto,index) => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  let nuevo = {
    nombre : colores[random(0,8)],
    productsId: index + 1,
    createdAt: new Date,
    updatedAt: new Date
  }
  return nuevo
})
let colorized = [].concat(colors1).concat(colors2).concat(colors)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Colors', colorized, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Colors', null, {});
  }
};