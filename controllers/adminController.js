const appointmentService = require('../services/appointmentServices');

exports.getTodaysAppointmentsforAdmin = async (req, res) => {
    try {
        const appointments = await appointmentService.getTodaysAppointmentsforAdmin();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};