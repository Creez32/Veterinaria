'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      /* Images.belongsTo(models.Products,{
        as : 'products',
        foreignKey: 'productsId'
      }) */
    }
  };
  Images.init({
    file: DataTypes.STRING,
    productsId: DataTypes.INTEGER
=======
      Images.belongsTo(models.Products,{
        as : 'imagenProduct'
      }),
      Images.belongsTo(models.Users,{
        as : 'imagenUser'
      })
    }
  };
  Images.init({
    name: DataTypes.STRING
>>>>>>> da12d2582f58db2a67f06465d30a0082f885b127
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};