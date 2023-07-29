const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {
    constructor() { }

    async create(data) {
        const newUser = await models.User.create(data);
        return newUser;
    }

    async addUserProduct(data) {
        const newUserProduct = await models.UserProduct.create(data);
        return newUserProduct;
    }

    async find() {
        const rta = await models.User.findAll({
            include: ['orders', 'user-product']
        });
        return rta;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id, {
            include: ['products', 'user-product']
        });
        if (!user) {
            throw boom.notFound('user not found');
        }
        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const rta = await user.update(changes);
        return rta;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}

module.exports = UsersService;
