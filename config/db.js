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
        const alterTableQuery = `ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user'`;
        const alterImageQuery = `ALTER TABLE users ADD COLUMN IF NOT EXISTS image VARCHAR(255)`;


        const createProfileTableQuery = `CREATE TABLE IF NOT EXISTS profiles (
            id SERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
            bio TEXT,
            address TEXT,
            avatar VARCHAR(255),
            phone VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            
        )`;

        await pool.query(createTableQuery);
        await pool.query(alterTableQuery);
        await pool.query(alterImageQuery)
        await pool.query(createProfileTableQuery);


        console.log('✅ Table "users" is ready and "role" column is present');
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
