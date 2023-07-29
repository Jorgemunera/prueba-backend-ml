const Joi = require('joi');

const id = Joi.number().integer().positive();
const userId = Joi.number().integer().positive();
const productId = Joi.number().integer().positive();

const createUserProductSchema = Joi.object({
    userId: userId.required(),
    productId: productId.required(),
});


const getUserProductSchema = Joi.object({
    id: id.required(),
});

module.exports = { createUserProductSchema, getUserProductSchema }
