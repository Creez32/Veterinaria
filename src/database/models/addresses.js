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
      Addresses.hasMany(models.Users,{
        as : 'Direcciones',
        foreignKey: 'addressesId'
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
    zipCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Addresses',
  });
  return Addresses;
};