const knex = require("knex");
require("dotenv").config();

const environment = process.env.NODE_ENV || "development"; // Default to 'development' if NODE_ENV is not set

const knexConfig = {
  client: "pg",
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST || "localhost", // Fallback to localhost for development
    user: process.env.DB_USER || "postgres", // Fallback to 'postgres' for development
    password: process.env.DB_PASSWORD || "", // Fallback to empty string for dev
    database: process.env.DB_NAME || "postgres", // Fallback to 'postgres' for dev
    port: process.env.DB_PORT || 5432, // Default to port 5432
  },
  migrations: {
    directory: "./migrations", // Directory for migration files
  },
};

// For production, ensure that SSL settings are configured
if (environment === "production") {
  knexConfig.connection.ssl = {
    rejectUnauthorized: false, // Disable SSL certificate validation for production (if required)
  };
}

const db = knex(knexConfig);

module.exports = db;
