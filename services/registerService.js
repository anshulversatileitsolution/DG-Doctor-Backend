const Common = require("../config/common");
const moments = require("../config/moment");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool } = require('../config/db');


exports.addUser = async (data) => {
  try {

    const fname = data.first_name;
    const lname = data.last_name
    const dob = data.dob
    const gender = data.gender
    const blood_group = data.blood_group
    const user_type = data.user_type


    // Set OUT parameter first
    await pool.execute('SET @out_user_id = 0');

    // Call SP with OUT param
    await pool.execute(
      'CALL sp_add_user(?, ?, ?, ?, ?, ?, @out_user_id)',
      [fname, lname, dob, gender, blood_group, user_type]
    );

    // Fetch the OUT parameter value
    const [outResult] = await pool.execute('SELECT @out_user_id AS userId');
    const userId = outResult[0].userId;
    if (!userId) {
      throw new Error("Failed to retrieve user ID from stored procedure.");
    }
    const phone = data.mobile;
    const email = data.email;
    const password = data.password;

    const bcryptPassword = await bcrypt.hash(password, 10);
    const personId = userId; // Assuming personId is the same as userId for this example

    // Update the user record with phone, email, and hashed password  

    await pool.execute('SET @outPersonID = 0'); // Set OUT parameter for person ID
    await pool.execute(
      'CALL add_security_User(?,?,?,?,@outPersonID)',
      [phone, email, bcryptPassword, personId]
    );
    const [security] = await pool.execute('SELECT @outPersonID AS securityId');
    const securityId = security[0].securityId;
    if (!securityId) {
      throw new Error("Failed to retrieve security ID from stored procedure.");
    }

    return {
      status: true,
      message: "User registered successfully",
      data: { userId },
    };

  } catch (error) {
    console.error("Error calling SP:", error.message);
    return {
      status: false,
      error: error.message,
    };
  }
};
