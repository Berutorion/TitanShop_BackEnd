/** @type {import('sequelize-cli').Migration} */
const Chance = require('chance');

const chance = new Chance();

module.exports = {
  async up(queryInterface, Sequelize) {
    // get user id
    const users = await queryInterface.sequelize.query(
      'SELECT id from Users WHERE role = "seller";',
    );

    const products = [];
    for (let i = 0; i < 100; i += 1) {
      products.push({
        name: chance.name(),
        price: chance.integer({ min: 1000, max: 100000 }),
        description: chance.paragraph(),
        stock: chance.integer({ min: 0, max: 100 }),
        seller: users[0][chance.integer({ min: 0, max: users[0].length - 1 })].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    try {
      await queryInterface.bulkInsert('Products', products);
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
