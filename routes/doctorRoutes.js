
const express = require('express');
const router = express.Router();

const doctortController = require('../controllers/doctorController');

// API endpoints
router.post('/getDoctorDetails', doctortController.getDoctorDetails);

router.get('/getDoctorList', doctortController.getDoctorList);


module.exports = router;