'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      direction: {
        allowNull: false,
        type: Sequelize.STRING
      },
      number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      apartament: {
        allowNull: true,
        type: Sequelize.STRING
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Users",
          },
          key : "id"
        },
        onDelete: 'cascade'
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
    await queryInterface.dropTable('Addresses');
  }
};