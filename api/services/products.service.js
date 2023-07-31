const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {

    constructor() { }

    async create(data) {
        console.log("data-----------", data)
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async findAllProducts() {
        const products = await models.Product.findAll();
        return products;
    }

    async findProductsByUserId(userId) {
        const products = await models.Product.findAll({
            where: { userId },
        });

        return products;
    }

    async findOneProduct(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.notFound('product not found');
        }
        return product;
    }

    async update(id, changes) {
        const [rowsUpdated, [updatedProduct]] = await models.Product.update(changes, {
            where: { id },
            returning: true,
        });

        if (rowsUpdated === 0) {
            throw boom.notFound('Product not found');
        }

        return updatedProduct;
    }

    async delete(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.notFound('Product not found');
        }

        await product.destroy();
        return { id: product.id };
    }

}

module.exports = ProductsService;
