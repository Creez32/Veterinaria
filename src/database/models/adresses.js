'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Adresses.hasMany(models.Users,{
        as : 'Users',
        foreignKey: 'addressId'
      })
    }
  };
  Adresses.init({
    direction: DataTypes.STRING,
    number: DataTypes.INTEGER,
    apartament: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    location: DataTypes.STRING,
    zipCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Adresses',
  });
  return Adresses;
};