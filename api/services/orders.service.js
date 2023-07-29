const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrdersService {

    constructor() { }

    async create(data) {
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    async updateOrAddItem(data) {
        const order = await models.Order.findByPk(data.userId);
        if(!order){

            const newOrder = await this.create(data);
            const newItem = await models.OrderProduct.create(data);
            return newItem;
        }

        const item = await models.OrderProduct.findAll({
            where:{
                orderId: data.orderId,
                productId: data.productId
            }
        })

        if(item.length === 0){
            const newItem = await models.OrderProduct.create(data);
            return newItem;
        }

        const updateItem = await this.updateItem(data.orderId, data)
        return updateItem;
    }

    async findAllOrders() {
        const orders = await models.Order.findAll({
            include: ['user', 'items']
        });
        return orders;
    }

    async findOneOrder(id) {
        const order = await models.Order.findByPk(id, {
            include: ['user', 'items']
        });
        if (!order) {
            throw boom.notFound('Order not found');
        }
        return order;
    }

    async updateItem(id, changes) {
        console.log('estoy aqui 7------------ ')
        console.log('id ------------ ', id)
        console.log('changes ------------ ', changes)
        const [rowsUpdated, [updatedItem]] = await models.OrderProduct.update(changes, {
            where: { orderId: id },
            returning: true,
        });

        console.log('estoy aqui 8------------ ')
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
