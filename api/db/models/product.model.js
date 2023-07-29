const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model')

const PRODUCT_TABLE = 'products';

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: USER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    }
}

class Product extends Model {

    static associate(models) {
        // this.belongsTo(models.User, {
        //     as: 'owner'
        // });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE };
