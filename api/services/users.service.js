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

    async findAllUsers() {
        const rta = await models.User.findAll({
            include: ['products', 'order']
        });
        return rta;
    }

    async findOneUser(id) {
        const user = await models.User.findByPk(id, {
            include: ['products', 'order']
        });
        if (!user) {
            throw boom.notFound('user not found');
        }
        return user;
    }

    async delete(id) {
        const user = await this.findOneUser(id);
        await user.destroy();
        return { id };
    }
}

module.exports = UsersService;
