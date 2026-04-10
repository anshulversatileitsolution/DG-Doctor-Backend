const express = require('express');
require('dotenv').config();
const { pool, checkDBConnection } = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();



app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.29.44:3000','https://dgdoc.netlify.app/'],
    credentials: true
}));
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
app.use('/uplods', express.static(path.join(__dirname, '..', 'uplods')));

// Routes
const userRoutes = require('./routes/userRoutes');
const registerRoutes = require('./routes/registerroutes');
const adminRoutes = require('./routes/adminRoutes')
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/deprtments', require('./routes/departmentRoutes'));
app.use('/api/lab', require('./routes/labRoutes'));

const PORT = process.env.PORT || 3001;

// Start server only after DB check
async function startServer() {
    await checkDBConnection();
    app.listen(PORT,'0.0.0.0', () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

startServer();