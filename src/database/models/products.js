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
        as : 'categories'
      }),
      Products.belongsTo(models.Varieties,{
        as : 'variety'
      }),
      Products.hasMany(models.Images,{
        as : 'img',
        foreignKey: 'imageId'
      })
    }
  };
  Products.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    varietyId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};