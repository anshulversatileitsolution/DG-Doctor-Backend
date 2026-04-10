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
    console.log("doctorCode", doctorCode);

    // Call SP with OUT param
    const doctorDetails = await pool.execute(
      'CALL sp_get_doctor_by_doctorCode(?)',
      [doctorCode]
    );
    console.log("doctorDetails = ", doctorDetails);

    // Fetch the OUT parameter value
    const Doctor = doctorDetails[0][0];
    console.log("Doctor", Doctor)
    if (!Doctor || Doctor.length === 0) {
      throw new Error("No records found for the provided doctor code");
    }
    return {
      status: true,
      message: "Doctor details retrieved successfully",
      data: { Doctor },
    };

  } catch (error) {
    console.error("Error in getDoctorDetails service:", error.message);
    throw error;
  }
};


exports.getDoctorList = async () => {
  try {
    // Imp   const fname = data.first_name;

    // Call SP with OUT param
    const doctorDetails = await pool.execute(
      'CALL get_Doctor_list()',
      []
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
      data: { Doctor },
    };

  } catch (error) {
    console.error("Error in getDoctorDetails service:", error.message);
    throw error;
  }
};
exports.addDoctor = async (data) => {
  try {
    const { FirstName, LastName, Gender, DOB, BloodGroup,
      DepartmentID, DoctorCode, Specialization, OPD_Fees, OPD_Time, CreatedBy } = data
    // Call SP with OUT param
    const personDetails = await pool.execute(
      'CALL sp_add_user(?,?,?,?,?,?, @out_user_id)',
      [FirstName, LastName, DOB, Gender, BloodGroup, "Doctor"]
    );
    console.log("personDetails = ", personDetails[0][0][0].PersonId);

    const doctorDetails = await pool.execute(
      'CALL sp_add_doctor(?,?,?,?,?,?,?)',
      [DepartmentID, personDetails[0][0][0].PersonId, DoctorCode, Specialization, OPD_Fees, OPD_Time, CreatedBy]
    );

    // Fetch the OUT parameter value
    const Doctor = doctorDetails[0][0];
    console.log("Doctor", Doctor)
    if (!Doctor || Doctor.length === 0) {
      throw new Error("No records found for the provided doctor code");
    }
    return {
      status: true,
      message: "Doctor added successfully",
      data: { Doctor }
    };
  } catch (error) {
    console.error("Error in addDoctor service:", error.message);
    throw error;
  }
};

exports.updateDoctor = async (data) => {

  try {
    const { PersonID, DoctorID, DOB, BloodGroup, AddressLine1, AddressLine2, AddressLine3,
      City, State, Country, PostalCode, OPD_Fees, OPD_Time } = data
    // Call SP with OUT param
    const doctorDetails = await pool.execute(
        'CALL sp_update_doctor_Details(?,?,?,?,?,?,?,?,?,?,?,?,? ,@out_DoctorID)',
        [PersonID, DoctorID, DOB, BloodGroup, AddressLine1, AddressLine2, AddressLine3, City, State, Country, PostalCode, OPD_Fees, OPD_Time]
    );
    console.log("doctorDetails = ", doctorDetails);
    // Fetch the OUT parameter value
    const Doctor = doctorDetails;
    console.log("Doctor", Doctor)
    if (!Doctor || Doctor.length === 0) {
      throw new Error("No records found for the provided doctor code");
    }
    return {
      status: true,
      message: "Doctor details updated successfully",
      data: {AffectedRows: doctorDetails[0].affectedRows }
    };

  } catch (error) {
    console.error("Error in updateDoctor service:", error.message);
    throw error;
  }
};
exports.deleteDoctor = async (PersonID) => {
  try {
    // Call SP with OUT param
    const doctorDetails = await pool.execute(
      'CALL sp_delete_doctor_by_Admin(?)',
      [PersonID]
    );
    console.log("doctorDetails = ", doctorDetails);
    // Fetch the OUT parameter value
    const Doctor = doctorDetails[0][0];
    console.log("Doctor", Doctor)
      if (!Doctor || Doctor.length === 0) {
        throw new Error("No records found for the provided person ID");
      }
    return {
      status: true,
      message: "Doctor deleted successfully",
      data: { DoctorID: Doctor.DoctorID }
    };
  } catch (error) {
    console.error("Error in deleteDoctor service:", error.message);
    throw error;
  }
};
