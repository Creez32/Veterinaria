'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Varieties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      Varieties.hasMany(models.Products,{
        as : 'varieties',
        foreignKey: 'varietyId'
=======
      Varieties.belongsTo(models.Products,{
        as : 'variety'
>>>>>>> da12d2582f58db2a67f06465d30a0082f885b127
      })
    }
  };
  Varieties.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Varieties',
  });
  return Varieties;
};