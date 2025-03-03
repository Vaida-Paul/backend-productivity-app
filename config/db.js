const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "pg", // PostgreSQL client
  connection: process.env.DATABASE_URL, // Use the DATABASE_URL from your environment variables
});

module.exports = db; // Export the db instance to use in other parts of your backend code
