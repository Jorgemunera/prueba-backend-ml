const Joi = require('joi');

const id = Joi.number().integer().positive();
const amount = Joi.number().integer().min(1).max(99);
const userId = Joi.number().integer();
const productId = Joi.number().integer();

const createOrderSchema = Joi.object({
    amount: amount.required(),
});

const updateOrderSchema = Joi.object({
    amount: amount,
});

const getOrdersSchema = Joi.object({

});

const getOrderSchema = Joi.object({
    id: id.required(),
});

const deleteOrderSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createOrderSchema,
    updateOrderSchema,
    getOrdersSchema,
    getOrderSchema,
    deleteOrderSchema
}

