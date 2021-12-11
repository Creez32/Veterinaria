'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Adresses.belongsTo(models.Users,{
        as : 'Users',
        foreignKey: 'userId'
      })
    }
  };
  Addresses.init({
    direction: DataTypes.STRING,
    number: DataTypes.INTEGER,
    apartament: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    location: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Addresses',
  });
  return Addresses;
};