const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');

// API endpoints
router.post('/createuser', registerController.createUser);
router.post('/login', registerController.loginUser);


module.exports = router;