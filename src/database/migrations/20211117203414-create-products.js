'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(8,2)
      },
      discount:{
        type: Sequelize.INTEGER
      },
      edad: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      peso: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Categories",
          },
          key : "id"
        },
      },
      varietyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Varieties",
          },
          key : "id"
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};