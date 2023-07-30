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

    async findOneUser(userId) {
        console.log('userId-----------', userId)
        const user = await models.User.findByPk(userId, {
            include: ['products', 'order']
        });
        console.log('user-----------', user)
        if (!user) {
            throw boom.notFound('user not found');
        }
        return user;
    }

    async findByEmail(email) {
        const rta = await models.User.findOne({
            where: { email }
        });
        return rta;
    }

    async delete(userId) {
        const user = await this.findOneUser(userId);
        await user.destroy();
        return { userId };
    }
}

module.exports = UsersService;
