const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientController');  

router.get('/getPatientList', patientController.getAllPatients);

module.exports = router;