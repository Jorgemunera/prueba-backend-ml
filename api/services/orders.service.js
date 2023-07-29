const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrdersService {

    constructor() { }

    async create(data) {
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    async addItem(data) {
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

    async find() {
        const orders = await models.Order.findAll({
            include: ['user', 'items']
        });
        return orders;
    }

    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: ['user', 'items']
        });
        if (!order) {
            throw boom.notFound('Order not found');
        }
        return order;
    }

    async update(id, changes) {

        const OrderUpdate = await models.Order.update();
        if (index === -1) {
            throw boom.notFound('Order not found');
        }
        const order = this.Orders[index];
        this.Orders[index] = {
            ...Order,
            ...changes
        };
        return this.Orders[index];
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
