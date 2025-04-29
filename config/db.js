const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//Create Table
const initDB = async () => {
  try {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
    await pool.query(createTableQuery); // Run the query to create the table
    console.log('✅ Table "users" is ready');
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
};

// Test connection and initialize DB
const testDbConnection = async () => {
  try {
    await pool.connect();
    console.log("✅ Connected to PostgreSQL database");
    await initDB(); // Create table after successful connection
  } catch (err) {
    console.error("❌ Error connecting to the database:", err.stack);
  }
};

testDbConnection(); // Call the function to test connection and initialize DB

module.exports = pool;
