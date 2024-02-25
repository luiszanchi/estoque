require('dotenv').config();

const config = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  models: [],
};

module.exports = {
  development: config,
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    autoLoadModels: true,
    synchronize: true,
  },
  production: {},
}