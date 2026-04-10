
const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/departmentController');

// API endpoints
router.get('/getDepartmentList', departmentController.getDepartmentList);
router.post('/addDepartment', departmentController.addDepartment);
router.patch('/updateDepartment', departmentController.updateDepartment);
router.post('/deleteDepartment', departmentController.deleteDepartment);


module.exports = router;