const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const ProductsService = require('./products.service');
const productService = new ProductsService();

class OrdersService {

    constructor() { }

    async create(data) {
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    async addItem(data) {
        const amountToBuy = data.amount;
        const order = await models.Order.findOne({
            where:{
                userId: data.userId
            }
        });

        const consultProduct = await models.Product.findOne({
            where:{
                id: data.productId
            }
        });

        if(!consultProduct){
            throw boom.notFound('product not found');
        }

        const productStock = consultProduct.dataValues.amount;
        if(amountToBuy > productStock){
            throw boom.badRequest('stock not available');
        }

        if(!order){
            const newOrder = await this.create(data);
            const newItem = await models.OrderProduct.create(data);

            const newStock = productStock - amountToBuy;
            data.amount = newStock;
            await productService.update(data.productId, {amount: data.amount});

            return newItem;
        }

        const newItem = await models.OrderProduct.create(data);

        const newStock = productStock - amountToBuy;
        data.amount = newStock;
        await productService.update(data.productId, {amount: data.amount});

        return newItem;
    }

    async findAllOrders() {
        const orders = await models.Order.findAll({
            include: ['user', 'items']
        });
        return orders;
    }

    async findOrderByUser(userId) {
        const order = await models.Order.findByPk(userId, {
            include: ['user', 'items']
        });
        if (!order) {
            throw boom.notFound('Order not found');
        }
        return order;
    }

    async updateItem(orderId, productId, changes) {
        const [rowsUpdated, [updatedItem]] = await models.OrderProduct.update(changes, {
            where: { orderId: orderId, productId: productId },
            returning: true,
        });

        if (rowsUpdated === 0) {
            throw boom.notFound('Item not found');
        }

        return updatedItem;
    }

    async delete(id) {
        const index = this.Orders.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Order not found');
        }
        this.Orders.splice(index, 1);
        return { id };
    }

}

module.exports = OrdersService;
