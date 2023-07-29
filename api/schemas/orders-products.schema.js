const Joi = require('joi');

const id = Joi.number().integer().positive();
const userId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1).max(99);

const createOrderProductSchema = Joi.object({
    userId: userId.required(),
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required()
});

const getOrderProductSchema = Joi.object({
    id: id,
    orderId: orderId,
    productId: productId
}).or('id', 'orderId', 'productId');


const deleteOrderProductSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createOrderProductSchema,
    getOrderProductSchema,
    deleteOrderProductSchema
}

