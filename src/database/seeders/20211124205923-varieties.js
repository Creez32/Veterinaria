'use strict';

let variedad = ['Alimento','Juguete','Medicamento','Accesorios','Contenedores']

let varieties = variedad.map(variety => {
  let nuevo = {
    name : variety,
    createdAt: new Date,
    updatedAt: new Date
  }
  return nuevo
})



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Varieties', varieties, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Varieties', null, {});
  }
};
