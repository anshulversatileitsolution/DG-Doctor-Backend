
const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/departmentController');

// API endpoints
router.get('/getDepartmentList', departmentController.getDepartmentList);


module.exports = router;