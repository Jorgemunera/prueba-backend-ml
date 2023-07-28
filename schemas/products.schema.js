const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(2).max(30);
const sku = Joi.string().alphanum().min(1).max(30);
const amount = Joi.number().integer().min(1).max(99);
const price = Joi.number().min(0.1).precision(2);

const createProductSchema = Joi.object({
    name: name.required(),
    sku: sku.required(),
    amount: amount.required(),
    price: price.required()
});

const updateProductSchema = Joi.object({
    name: name,
    sku: sku,
    amount: amount,
    price: price
});

const getProductsSchema = Joi.object({

});

const getProductSchema = Joi.object({
    id: id.required(),
});

const deleteProductSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductsSchema,
    getProductSchema,
    deleteProductSchema
}

