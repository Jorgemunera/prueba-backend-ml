const express = require('express');

const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    createUserSchema,
    getUserSchema } = require('../schemas/users.schema');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
    try {
        const users = await service.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.findOneUser(id);
            res.status(200).json(category);
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


module.exports = router;
