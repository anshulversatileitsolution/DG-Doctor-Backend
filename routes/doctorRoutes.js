
const express = require('express');
const router = express.Router();

const doctortController = require('../controllers/doctorController');

// API endpoints
router.post('/getDoctorDetails', doctortController.getDoctorDetails);


module.exports = router;