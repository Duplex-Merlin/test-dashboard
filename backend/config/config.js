require('dotenv').config();

const config = {
  development: {
    host: `${process.env.DB_HOST_NAME}`,
    port: 5432,
    database: `${process.env.DB_NAME}`,
    username: `${process.env.DB_USER_NAME}`,
    password: `${process.env.DB_PASSWORD}`,
    dialect: 'postgres',
    schema: process.env.DB_SCHEMA,
    dialectOptions: {
      schema: process.env.DB_SCHEMA,
    },
  },
  test: {
    username: 'postgres',
    password: 'root',
    database: 'dashboard-db',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};

module.exports = config;
