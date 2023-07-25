require('dotenv').config();

module.exports = {
  development: {
    username: 'admin',
    password: '26604079',
    database: 'titan_shop_development',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+08:00',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+08:00',
  },
};
