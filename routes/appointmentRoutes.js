const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');


router.post('/bookAppointment',appointmentController.bookAppointment);
router.post('/getAppointmentByPatientID',appointmentController.getAppointmentByPatientID);
router.post('/getTodayDoctorAppointmentsbyDoctorID',appointmentController.getTodayDoctorAppointmentsbyDoctorID);

router.post('/saveprescription',appointmentController.saveprescription);
router.post('/getprescription',appointmentController.getprescription);
router.post('/getLabtests',appointmentController.getLabtests);
router.post('/updateAppointmentStatus',appointmentController.updateAppointmentStatus);
router.post('/UpdateQR',appointmentController.UpdateQR);
router.post('/getQRDetails',appointmentController.getQRDetails);

router.post('/getAppointmentListByDoctorID',appointmentController.getAppointmentListbyDoctorID);

module.exports = router;