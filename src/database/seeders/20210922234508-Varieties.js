'use strict';
let variety = ['Alimento','Medicina','Juguetes','Correas','Vacunas','Contenedores','Accesorios','Otros']

 let variedad = variety.map(product =>{ 
  let coso = {
    name: product,
    createdAt: new Date,
    updatedAt: new Date
  }
  return coso
})
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Varieties', variedad, {});
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Varieties', null, {});
    
  }
};

