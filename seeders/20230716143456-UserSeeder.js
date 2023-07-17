const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      return queryInterface.bulkInsert(
        'Users',
        [
          {
            name: 'buyer001',
            account: 'buyer001',
            password: bcrypt.hashSync('titaner'),
            role: 'buyer',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'buyer002',
            account: 'buyer002',
            password: bcrypt.hashSync('titaner'),
            role: 'buyer',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'seller001',
            account: 'seller001',
            password: bcrypt.hashSync('titaner'),
            role: 'seller',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'seller001',
            account: 'seller001',
            password: bcrypt.hashSync('titaner'),
            role: 'seller',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      );
    } catch (error) {
      console.log(error);
    }
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', {}),
};
