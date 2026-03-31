const { getDoctorDetails } = require("../controllers/doctorController")
const Common = require("../config/common");
const moments = require("../config/moment");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool } = require('../config/db');;

exports.getDoctorDetails = async (doctorCode) => {
  try {
    // Imp   const fname = data.first_name;

    // Call SP with OUT param
   const doctorDetails= await pool.execute(
      'CALL sp_get_doctor_by_doctorCode(?)',
      [doctorCode]
    );

    // Fetch the OUT parameter value
    const Doctor = doctorDetails[0][0];
    console.log("Doctor", Doctor)
    if (!Doctor || Doctor.length === 0) {
      throw new Error("No records found for the provided doctor code");
    }
    return {
      status: true,
      message: "Doctor details retrieved successfully",
      data: {Doctor },
    };

  } catch (error) {
    console.error("Error in getDoctorDetails service:", error.message);
    throw error;
  }
};
    