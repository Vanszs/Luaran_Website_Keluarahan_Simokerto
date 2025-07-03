const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
};

async function initializeDatabase() {
  let connection;
  
  try {
    console.log('Connecting to MySQL server...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('Creating database if not exists...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'lapor_maling'}`);
    
    console.log('Switching to database...');
    await connection.query(`USE ${process.env.DB_NAME || 'lapor_maling'}`);
    
    // Read the SQL file containing the full schema and seed data
    const sqlPath = path.join(__dirname, '..', 'sql', 'lapor_maling.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Running database setup script...');
    await connection.query(sqlScript);
    
    console.log('✅ Database initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase();
