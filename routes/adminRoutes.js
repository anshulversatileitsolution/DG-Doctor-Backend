const express= require('express');
const router = express.Router();
  const adminController = require('../controllers/adminController');
router.get('/getTodaysAppointmentsforAdmin',adminController.getTodaysAppointmentsforAdmin);
module.exports = router;