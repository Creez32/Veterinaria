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
<<<<<<< HEAD
        as : 'category'
      })
      Products.belongsTo(models.Varieties,{
        as : 'variety'
      })
      Products.hasMany(models.Images, {
        as : 'images',
        foreignKey : "productsId"
      })
      Products.hasMany(models.Colors, {
        as : 'colors',
        foreignKey: 'productsId'
=======
        as : 'categories'
      }),
      Products.belongsTo(models.Varieties,{
        as : 'variety'
      }),
      Products.hasMany(models.Images,{
        as : 'img',
        foreignKey: 'imageId'
>>>>>>> da12d2582f58db2a67f06465d30a0082f885b127
      })
    }
  };
  Products.init({
    name: DataTypes.STRING,
<<<<<<< HEAD
    brand: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount:DataTypes.INTEGER,
    edad: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    varietyId: DataTypes.INTEGER
=======
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    varietyId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
>>>>>>> da12d2582f58db2a67f06465d30a0082f885b127
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};