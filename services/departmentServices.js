const { getDoctorDetails } = require("../controllers/doctorController")
const Common = require("../config/common");
const moments = require("../config/moment");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool } = require('../config/db');const e = require("express");
;

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
exports.addDepartment = async (departmentData) => {
  try {
    // Imp   const fname = data.first_name;
    console.log("departmentData", departmentData);
    const { DepartmentName,CreatedBy } = departmentData;
    // Call SP with OUT param
    const addDepartmentResponse = await pool.execute(
      'CALL sp_add_department(?, ?,@out_DepartmentID)',
      [DepartmentName, CreatedBy]
    );
    console.log("addDepartmentResponse = ", addDepartmentResponse);
    // Fetch the OUT parameter value
    const Department = addDepartmentResponse[0][0];
    console.log("Department", Department)
    if (!Department || Department.length === 0) {
      throw new Error("No records found for the provided department code");
    }
    return {
      status: true,
      message: "Department added successfully",
      data: {DepartmentId: Department.DepartmentID }
    };
  } catch (error) {
    console.error("Error in addDepartment service:", error.message);
    throw error;
  }
};
exports.updateDepartment = async (departmentData) => {
  try {
    // Imp   const fname = data.first_name;
    const{DepartmentID, DepartmentName,UpdatedBy}= departmentData;
    // Call SP with OUT param
    const updateDepartmentResponse = await pool.execute(
      'CALL sp_update_Department_by_admin(?, ?, ?,@out_DepartmentID)',
      [DepartmentID, DepartmentName,UpdatedBy]
    );
    console.log("updateDepartmentResponse = ", updateDepartmentResponse);
    // Fetch the OUT parameter value
    const Department = updateDepartmentResponse[0]
    console.log("Department", Department)
    if (!Department || Department.length === 0) {
      throw new Error("No records found for the provided department code");
    }
    return {
      status: true,
      message: "Department updated successfully",
      data: {DepartmentID:Department.DepartmentID },
    };
  } catch (error) {
    console.error("Error in updateDepartment service:", error.message);
    throw error;
  }
};  

exports.deleteDepartment = async (departmentData) => {
  try {
    // Imp   const fname = data.first_name;
    const{DepartmentID}= departmentData;
    // Call SP with OUT param
    const deleteDepartmentResponse = await pool.execute(
      'CALL delete_department_by_admin(?)',
      [DepartmentID]
    )
    console.log("deleteDepartmentResponse = ", deleteDepartmentResponse);
    // Fetch the OUT parameter value
    const Department = deleteDepartmentResponse[0]
    console.log("Department", Department)
    if (!Department || Department.length === 0) {
      throw new Error("No records found for the provided department code");
    } 
    return {
      status: true,
      message: "Department deleted successfully",
      data: {DepartmentID:Department.DepartmentID },
    };
  } catch (error) {
    console.error("Error in deleteDepartment service:", error.message);
    throw error;
  }
};