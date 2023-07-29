const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(2).max(30);
const sku = Joi.string().regex(/^[a-zA-Z0-9-]{5,30}$/);
const amount = Joi.number().integer().min(1).max(99);
const price = Joi.number().integer().min(1);
const userId = Joi.number().integer().positive();

const createProductSchema = Joi.object({
    name: name.required(),
    sku: sku.required(),
    amount: amount.required(),
    price: price.required(),
    userId: userId.required()
});

const updateProductSchema = Joi.object({
    amount: amount.required(),
    price: price
});

const getProductsByUserSchema = Joi.object({
    userId: userId.required()
});

const getOneProductSchema = Joi.object({
    id: id.required(),
});

const deleteProductSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductsByUserSchema,
    getOneProductSchema,
    deleteProductSchema
}

