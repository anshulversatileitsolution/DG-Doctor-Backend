const express = require('express');
require('dotenv').config();
const { pool, checkDBConnection } = require('./config/db');

const app = express();
app.use(express.json());

// Health check route
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1'); // Lightweight ping
        res.status(200).json({
            status: 'ok',
            database: 'connected'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            message: err.message
        });
    }
});

// Routes
const userRoutes = require('./routes/userRoutes');
const registerRoutes = require('./routes/registerroutes');
app.use('/api/users', userRoutes);
app.use('/api/register', registerRoutes);

const PORT = process.env.PORT || 3001;

// Start server only after DB check
async function startServer() {
    await checkDBConnection();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

startServer();