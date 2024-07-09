const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE, // Database name
  process.env.POSTGRES_USER,     // Database username
  process.env.POSTGRES_PASSWORD, // Database password
  {
    host: process.env.POSTGRES_HOST, // Database host
    port: process.env.POSTGRES_PORT, // Database port
    dialect: 'postgres',             // Dialect
  }
);

module.exports = sequelize;
