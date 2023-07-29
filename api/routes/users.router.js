const express = require('express');

const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/users.schema');
const { createUserProductSchema } = require('../schemas/users-products.schema');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
    try {
        const users = await service.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.findOne(id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newCategory = await service.create(body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const category = await service.update(id, body);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({ id });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/user-product',
    validatorHandler(createUserProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newItem = await service.addUserProduct(body);
            res.status(201).json(newItem);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
