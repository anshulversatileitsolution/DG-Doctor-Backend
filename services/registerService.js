const Common = require("../config/common");
const moments = require("../config/moment");
const axios = require("axios");

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
      [fname, lname, dob,gender,blood_group,user_type]
    );

    // Fetch the OUT parameter value
    const [outResult] = await pool.execute('SELECT @out_user_id AS userId');
    const userId = outResult[0].userId;

    return {
      status: true,
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