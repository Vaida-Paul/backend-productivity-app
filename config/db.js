// db.js
const knex = require("knex");
require("dotenv").config();
const knexConfig = require("../knexfile"); // Adjust path if needed

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];

const db = knex(config);

module.exports = db;
