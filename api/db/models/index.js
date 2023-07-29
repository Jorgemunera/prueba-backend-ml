const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');
const { UserProduct, UserProductSchema } = require('./user-product.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));
    OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
    UserProduct.init(UserProductSchema, UserProduct.config(sequelize));

    User.associate(sequelize.models);
    Product.associate(sequelize.models);
    Order.associate(sequelize.models);
}

module.exports = setupModels;
