const knex = require("knex");
const config = require("../knexfile");

// Determine if we are in a production environment or development
const environment = process.env.NODE_ENV || "development"; // Default to development if not set
const db = knex(config[environment]); // Use the appropriate configuration based on the environment

module.exports = db;
