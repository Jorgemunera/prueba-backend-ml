const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
    deleteProductSchema
 } = require('../schemas/products.schema')


const service = new ProductsService();

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const products = await service.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
})

router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newProduct = await service.create(body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
);

router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const body = req.body;

            const productUpdated = await service.update(id, body);
            res.status(200).json(productUpdated);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(deleteProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const productDeleted = await service.delete(id);
            res.status(200).json(productDeleted);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
