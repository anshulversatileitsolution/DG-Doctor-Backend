const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// API endpoints
router.get('/getuser', userController.getUsers);
router.get('/getuserIDS/:id', userController.getUserById);

module.exports = router;