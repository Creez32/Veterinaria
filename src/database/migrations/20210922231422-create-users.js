'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      lastName: {
        type: Sequelize.STRING(100)
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      addressId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Addresses",
          },
          key : "id"
        }
      },
      imageId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Images",
          },
          key : "id"
        }
      },
      rolId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Rols",
          },
          key : "id"
        }
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
    await queryInterface.dropTable('Users');
  }
};