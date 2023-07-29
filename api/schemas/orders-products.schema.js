const Joi = require('joi');

const id = Joi.number().integer().positive();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();

const createOrderProductSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required()
});

const getOrderProductSchema = Joi.object({
    id: id.required(),
});

const deleteOrderProductSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createOrderProductSchema,
    getOrderProductSchema,
    deleteOrderProductSchema
}

