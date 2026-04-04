const { getDoctorDetails } = require("../controllers/doctorController")
const Common = require("../config/common");
const moments = require("../config/moment");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool } = require('../config/db');;




exports.getPatientList = async () => {
  try {
    // Imp   const fname = data.first_name;

    // Call SP with OUT param
   const patientDetails= await pool.execute(
      'CALL get_Patient_list()',
      []
    );

    // Fetch the OUT parameter value
    const Patient = patientDetails[0][0];
    console.log("Patient", Patient)
    if (!Patient || Patient.length === 0) {
      throw new Error("No records found for the provided patient code");
    }
    return {
      status: true,
      message: "Patient details retrieved successfully",
      data: {Patient },
    };

  } catch (error) {
    console.error("Error in getPatientList service:", error.message);
    throw error;
  }
};