const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { PRODUCT_TABLE } = require('./product.model');

const USER_PRODUCT_TABLE = 'users_products';

const UserProductSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class UserProduct extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_PRODUCT_TABLE,
      modelName: 'UserProduct',
      timestamps: false
    }
  }
}

module.exports = { UserProduct, UserProductSchema, USER_PRODUCT_TABLE };
