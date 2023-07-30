const Joi = require('joi');

const id = Joi.number().integer().positive();
const userId = Joi.number().integer().positive();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.array().items(Joi.string().valid('administrador', 'vendedor', 'comprador')).optional();

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    role: role
});

const updateUserSchema = Joi.object({
    email: email,
    role: role,
});

const getUserSchema = Joi.object({
    userId: userId.required(),
});

const deleteUserSchema = Joi.object({
    userId: userId.required(),
});

module.exports = { createUserSchema, updateUserSchema, deleteUserSchema }
