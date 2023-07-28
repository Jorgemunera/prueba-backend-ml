const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService{

    constructor(){
        this.products = [];
        this.generate();
    }

    async generate(){
        const limit = 100;
        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                sku: faker.commerce.productDescription(),
                amount: faker.number.int({min: 1, max: 99}),
                price: parseInt(faker.commerce.price(), 10),
            });
        };
    }

    find(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products)
            }, 2000)
        });
    }

    async findOne(id){
        const product = this.products.find((product) => product.id == id);
        if(!product){
            throw boom.notFound('product not found');
        }
        return product;
    }

    async create(data){
        const newProduct = {
            id: faker.string.uuid(),
            ...data
        }

        this.products.push(newProduct)

        return newProduct;
    }

    async update(id, changes){
        const index = this.products.findIndex((product) => product.id == id);
        if(index == -1){
            throw boom.notFound('product not found');
        }

        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        }

        return this.products[index];
    }

    async delete(id){
        const index = this.products.findIndex((product) => product.id == id);
        if(index == -1){
            throw boom.notFound('product not found');
        }
        this.products.splice(index, 1)

        return {id};
    }
}

module.exports = ProductsService;
