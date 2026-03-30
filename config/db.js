const sql = require('mssql');
require('dotenv').config(); // Optional, if you use .env file
// SQL Server configuration
const config = {
    user: process.env.DB_USER || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    server: process.env.DB_SERVER || 'localhost', // e.g., localhost\SQLEXPRESS
    database: process.env.DB_NAME || 'your_database',
    options: {
        encrypt: true, // for Azure, or false for local
        trustServerCertificate: true // change to false for production
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Create connection pool
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.log('Database connection failed:', err));

module.exports = {
    sql,       // SQL object for queries
    poolPromise // Promise of connected pool
};