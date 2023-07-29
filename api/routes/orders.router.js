const express = require('express');

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
    async (req, res, next) => {
        try {
            const orders = await service.findAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await service.findOneOrder(id);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
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
    validatorHandler(createOrderProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newItem = await service.updateOrAddItem(body);
            res.status(201).json(newItem);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
