const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
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
}

class User extends Model {
    static associate(models) {
        this.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'userId'
        });
        this.belongsToMany(models.Product, {
            as: 'user-product',
            through: models.UserProduct,
            foreignKey: 'userId',
            otherKey: 'productId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}


module.exports = { USER_TABLE, UserSchema, User }
