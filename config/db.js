const mysql = require('mysql2/promise');
require('dotenv').config();

// ✅ Correct way to create pool with mysql2/promise
const pool = mysql.createPool({
    host: process.env.DB_SERVER || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydb',
    port:25597,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check DB connection on startup
async function checkDBConnection() {
    try {
        // ✅ Use pool.execute instead of pool.getConnection
        await pool.execute('SELECT 1');
        console.log('✅ MySQL connected successfully');
    } catch (err) {
        console.error('❌ MySQL connection failed:', err.message);
        process.exit(1);
    }
}

module.exports = { pool, checkDBConnection };