const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');

// API endpoints
router.post('/createuser', registerController.createUser);


module.exports = router;