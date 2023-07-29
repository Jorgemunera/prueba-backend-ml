const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {

    constructor() {}

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async find() {
        const products = await models.Product.findAll();
        return products;
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.notFound('product not found');
        }
        return product;
    }

    async update(id, changes) {

        const productUpdate = await models.Product.update();
        if (index === -1) {
            throw boom.notFound('product not found');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('product not found');
        }
        this.products.splice(index, 1);
        return { id };
    }

}

module.exports = ProductsService;
