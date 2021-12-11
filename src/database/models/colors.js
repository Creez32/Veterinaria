'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Colors.belongsTo(models.Products,{
        as : 'products',
        foreignKey: 'productsId'
      })
    }
  };
  Colors.init({
    nombre: DataTypes.STRING,
    productsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Colors',
  });
  return Colors;
};