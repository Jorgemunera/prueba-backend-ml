const express = require('express');

const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const {
    createUserSchema,
    getUserSchema,
    deleteUserSchema} = require('../schemas/users.schema');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new UsersService();

router.get('/',
    passport.authenticate('jwt', {session: false}),
    checkRoles(['administrador']),
    async (req, res, next) => {
        try {
            const users = await service.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/get-role-by-user',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const user = await service.findRoleByUser(userId);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    // validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await service.findOneUser(id);
            res.status(200).json(user);
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
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(deleteUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            await service.delete(userId);
            res.status(201).json({ userId });
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;
