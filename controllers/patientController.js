const patientService = require('../services/patientService');

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getPatientList();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};