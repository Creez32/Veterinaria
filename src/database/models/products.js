'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Categories,{
        as : 'category',
        foreignKey: 'categoryId'
      })
      Products.belongsTo(models.Varieties,{
        as : 'variety',
        foreignKey: 'varietyId'
      })
      Products.hasMany(models.Images, {
        as : 'images'
      })
      Products.hasMany(models.Colors, {
        as : 'colors'
      })
    }
  };
  Products.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount:DataTypes.INTEGER,
    edad: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    varietyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};