'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rols.hasMany(models.Users,{
<<<<<<< HEAD
        as : 'User',
=======
        as : 'rol',
>>>>>>> da12d2582f58db2a67f06465d30a0082f885b127
        foreignKey: 'rolId'
      })
    }
  };
  Rols.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rols',
  });
  return Rols;
};