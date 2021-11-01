'use strict';

let categorias = ['Perros','Gatos','Reptiles','Aves','Roedores','Peces','Insectos','Otros']

let supercategorias = categorias.map(categoria =>{ 
    let coso = {
      name: categoria,
      createdAt: new Date,
      updatedAt: new Date
    }
    return coso
  })

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Categories', supercategorias, {});
      
  },
  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
