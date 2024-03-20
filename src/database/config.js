require('dotenv').config();

const config = {
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST || 'mysql',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'estoque',
  password: process.env.DB_PASSWORD || 'estoque',
  database: process.env.DB_SCHEMA || 'estoque',
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