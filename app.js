const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool, checkDBConnection } = require('./config/db');

const app = express();

// ✅ Fix — remove app.options('*') and just use cors() middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// ❌ Remove this line — it causes the PathError
// app.options('*', cors());

app.use(express.json());

// Health check route
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
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
const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/users', userRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/doctor', doctorRoutes);

const PORT = process.env.PORT || 3001;

async function startServer() {
    await checkDBConnection();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

startServer();