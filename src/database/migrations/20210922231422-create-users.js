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
        type: Sequelize.STRING(50)
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      phone: {
        allowNull: false,
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
      rolId: {
        allowNull: false,
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