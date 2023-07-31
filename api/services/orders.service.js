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

    async addItem(data, userId) {
        console.log("userId------------", userId)

        const amountToBuy = 1;
        const order = await models.Order.findOne({
            where:{
                userId: userId
            }
        });
        console.log("order------------", order)

        const consultProduct = await models.Product.findOne({
            where:{
                id: data.productId
            }
        });
        console.log("consultProduct------------", consultProduct)
        if(!consultProduct){
            throw boom.notFound('product not found');
        }

        const productStock = consultProduct.dataValues.amount;
        console.log("productStock------------", productStock)

        if(amountToBuy > productStock){
            throw boom.badRequest('stock not available');
        }

        if(!order){
            const newOrder = await this.create({userId});
            console.log("newOrder------------", newOrder)
            const obj = {...data, ...{userId: userId, amount: amountToBuy, orderId: newOrder.dataValues.id}}
            console.log("obj------------", obj)

            const newItem = await models.OrderProduct.create(obj);
            console.log("newItem------------", newItem)

            const newStock = productStock - amountToBuy;
            data.amount = newStock;
            await productService.update(data.productId, {amount: data.amount});

            return newItem;
        }

        const obj = {...data, ...{userId: userId, amount: amountToBuy, orderId: order.dataValues.id}}
        const newItem = await models.OrderProduct.create(obj);
        console.log("newItem2------------", newItem)

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

    async findProductsInOrderByUser(userId) {
        const order = await models.Order.findByPk(userId);
        if (!order) {
            throw boom.notFound('Order not found');
        }

        const orderId = order.id;
        const registros = await models.OrderProduct.findAll({
            where:{
                orderId: orderId
            }
        })

        const amountPurchasedByProduct = registros.reduce((acc, curr) => {
            if (!acc[curr.productId]) {
              acc[curr.productId] = curr.amount;
            } else {
              acc[curr.productId] += curr.amount;
            }
            return acc;
          }, {});

        let productsInOrder = []
        for(const productId in amountPurchasedByProduct){
            const product = await models.Product.findByPk(productId);
            if (!product) {
                throw boom.notFound('Product not found');
            }
            const copyProduct = {...product.dataValues}
            copyProduct.amount = amountPurchasedByProduct[productId]
            productsInOrder.push(copyProduct)
        }

        return productsInOrder;
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
