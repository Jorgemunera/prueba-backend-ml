const express = require('express');
const passport = require('passport');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    createProductSchema,
    updateProductSchema,
    getOneProductSchema,
    deleteProductSchema,
    getProductsByUserSchema,
 } = require('../schemas/products.schema');


const service = new ProductsService();

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const products = await service.findAllProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/user/:userId',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getProductsByUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const {userId} = req.params;
            const products = await service.findProductsByUserId(userId);
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getOneProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOneProduct(id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
);
let stock = 0
router.post('/',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newProduct = await service.create(body);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getOneProductSchema, 'params'),
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
    passport.authenticate('jwt', {session: false}),
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
