'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Images,{
        as : 'img',
        foreignKey: 'imagenId'
      }),
      Users.belongsTo(models.Addresses,{
        as : 'addresses'
      }),
      Users.belongsTo(models.Rols,{
        as : 'rol'
      })
    }
  };
  Users.init({
    name: DataTypes.STRING(100),
    lastName: DataTypes.STRING(100),
    phone: DataTypes.STRING(20),
    password: DataTypes.STRING,
    email: DataTypes.STRING(100),
    addressId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};