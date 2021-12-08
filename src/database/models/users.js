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
<<<<<<< HEAD
      Users.belongsTo(models.Adresses,{
        as : 'Address'
      })
=======
      Users.hasMany(models.Images,{
        as : 'img',
        foreignKey: 'imagenId'
      }),
      Users.belongsTo(models.Addresses,{
        as : 'addresses'
      }),
>>>>>>> da12d2582f58db2a67f06465d30a0082f885b127
      Users.belongsTo(models.Rols,{
        as : 'rol'
      })
    }
  };
  Users.init({
<<<<<<< HEAD
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
=======
    name: DataTypes.STRING(100),
    lastName: DataTypes.STRING(100),
    phone: DataTypes.STRING(20),
    password: DataTypes.STRING,
    email: DataTypes.STRING(100),
    addressId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
>>>>>>> da12d2582f58db2a67f06465d30a0082f885b127
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};