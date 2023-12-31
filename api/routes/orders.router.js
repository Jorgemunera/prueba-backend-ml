const express = require('express');
const passport = require('passport');
const OrdersService = require('../services/orders.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    getOrderSchema,
    createOrderSchema,
} = require('../schemas/orders.schema');
const { createOrderProductSchema } = require('../schemas/orders-products.schema');


const router = express.Router();
const service = new OrdersService();

router.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            const orders = await service.findAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
);

// endpoint para obtener los productos comprados por usuario
router.get('/user',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const products = await service.findProductsInOrderByUser(userId);
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(createOrderSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newOrder = await service.create(body);
            res.status(201).json(newOrder);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/add-item',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(createOrderProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const body = req.body;
            const newItem = await service.addItem(body, userId);
            res.status(201).json(newItem);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
