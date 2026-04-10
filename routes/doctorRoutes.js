
const express = require('express');
const router = express.Router();

const doctortController = require('../controllers/doctorController');

// API endpoints
router.post('/getDoctorDetails', doctortController.getDoctorDetails);

router.get('/getDoctorList', doctortController.getDoctorList);

router.post('/addDoctor', doctortController.addDoctor);

router.post('/updateDoctor', doctortController.updateDoctor);

router.post('/deleteDoctor', doctortController.deleteDoctor);


module.exports = router;