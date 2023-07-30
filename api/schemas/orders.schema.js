const Joi = require('joi');

const id = Joi.number().integer().positive();
const userId = Joi.number().integer();

const createOrderSchema = Joi.object({
    userId: userId.required(),
});

const updateOrderSchema = Joi.object({
    id: id.required(),
});

const getAllOrdersSchema = Joi.object({
});

const getOrderSchema = Joi.object({
    userId: userId.required(),
});

const deleteOrderSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createOrderSchema,
    updateOrderSchema,
    getAllOrdersSchema,
    getOrderSchema,
    deleteOrderSchema
}

