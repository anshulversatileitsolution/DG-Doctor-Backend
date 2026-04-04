const { getDoctorDetails } = require("../controllers/doctorController")
const Common = require("../config/common");
const moments = require("../config/moment");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool } = require('../config/db');;

exports.getDepartmentList = async () => {
  try {
    // Imp   const fname = data.first_name;

    // Call SP with OUT param
   const departmentDetails= await pool.execute(
      'CALL getDepartmentList()',
      []
    );

    // Fetch the OUT parameter value
    const Department = departmentDetails[0][0];
    console.log("Department", Department)
    if (!Department || Department.length === 0) {
      throw new Error("No records found for the provided department code");
    }
    return {
      status: true,
      message: "Department details retrieved successfully",
      data: {Department },
    };

  } catch (error) {
    console.error("Error in getDepartmentList service:", error.message);
    throw error;
  }
};