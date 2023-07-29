'use strict';

const { USER_TABLE } = require('../models/user.model');
const { PRODUCT_TABLE } = require('../models/product.model');
const { ORDER_TABLE } = require('../models/order.model');
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model');


module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(USER_TABLE, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING
            },
            role: {
                allowNull: false,
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: ['comprador', 'vendedor']
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'create_at',
                defaultValue: Sequelize.NOW
            }
        });

        await queryInterface.createTable(PRODUCT_TABLE, {
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
        });

        await queryInterface.createTable(ORDER_TABLE, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
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
                onDelete: 'SET NULL',
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'created_at',
                defaultValue: Sequelize.NOW,
            },

        });
        await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            orderId: {
                field: 'order_id',
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: ORDER_TABLE,
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
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'created_at',
                defaultValue: Sequelize.NOW,
            },
        });

    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
        await queryInterface.dropTable(ORDER_TABLE);
        await queryInterface.dropTable(PRODUCT_TABLE);
        await queryInterface.dropTable(USER_TABLE);
    }
};
