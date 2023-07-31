const {USER_TABLE} = require('../models/user.model')

module.exports = {
    up: (queryInterface) => {
      return queryInterface.bulkInsert(USER_TABLE, [{
        email: 'admin@mail.com',
        password: 'admin1234',
        role: ['administrador'],
        createdAt: new Date(),
      }]);
    },
    down: (queryInterface) => {
      return queryInterface.bulkDelete(USER_TABLE, null, {});
    }
  };
