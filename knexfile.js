require("dotenv").config(); // Make sure dotenv is required at the top

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost", // Fallback to localhost if not set in .env
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "postgres",
      port: process.env.DB_PORT || 5432, // Default to 5432 if not set in .env
    },
    migrations: {
      directory: "./migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL for production
      ssl: {
        rejectUnauthorized: false, // This is required for Render and other cloud PostgreSQL services
      },
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
