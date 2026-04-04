const Common = require("../config/common");
const moments = require("../config/moment");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool } = require('../config/db');


exports.bookAppointment = async (data) => {
  try {
//  PersonID,
            // DoctorID,
            // ReasonForVisit,
            // SelfRelative,
            // AppointmentDate,
            // AppointmentTime,
            // QR_Type,
            // PaymentStatus,
            // OPD_Fees
    var { PersonID,DoctorID,AppointmentDate,AppointmentTime,ReasonForVisit,SelfRelative,QR_Type,OPD_Fees,PaymentStatus,CreatedBy} = data;

    AppointmentDate = moments.formatDate(AppointmentDate, 'YYYY-MM-DD');

    console.log(PersonID,DoctorID,AppointmentDate,AppointmentTime,ReasonForVisit,SelfRelative,QR_Type,OPD_Fees,PaymentStatus);
    
        
     // Set OUT parameter first
    await pool.execute('SET @out_appointment_id = 0');

    // Call SP with OUT param
    const apointmentData = await pool.execute(
      'CALL add_appointments(?, ?, ?, ?, ?, ?,?,?,?,?)',
      [PersonID,DoctorID,AppointmentDate,AppointmentTime,ReasonForVisit,SelfRelative,QR_Type,OPD_Fees,PaymentStatus,CreatedBy]
    );

    console.log("apointmentData = ",apointmentData[0][0][0].AppointmentID);
    
  
    const appointmentId = apointmentData[0][0][0].AppointmentID
    if (!appointmentId) {
      throw new Error("Failed to retrieve appointment ID from stored procedure.");
    }
    return {
      status: true,
      message: "Appointment booked successfully",
      data: { appointmentId },
    };

  } catch (error) {
    console.error("Error calling SP:", error.message);
    return {
      status: false,
      error: error.message,
    };
  }
};
exports.getAppointmentByPatientID = async (PersonID) => {
  try {
    const [appointments] = await pool.execute(
      'CALL get_appointments_by_userID(?)',
      [PersonID]
    );
    return {
      status: true,
      data: appointments,
    };
  } catch (error) {
    console.error("Error calling SP:", error.message);
    return {
      status: false,
      error: error.message,
    };
  }
};

exports.getprescription = async (data) => {
  try {
    const [prescriptions] = await pool.execute(
      'CALL sp_get_prescription_by_appointmentID(?)',
      [data]
    );
    return {
      status: true,
      data: prescriptions,
    };
  } catch (error) {
    console.error("Error calling SP:", error.message);
    return {
      status: false,
      error: error.message,
    };
  }
};
exports.getTodayDoctorAppointmentsbyDoctorID = async (DoctorID) => {
  try {
    const todayDate = moments.formatDate(new Date(), 'YYYY-MM-DD');
    const [appointments] = await pool.execute(
      'CALL get_doctor_today_appointment_by_id(?, ?)',
      [DoctorID, todayDate] 
    );
    return {
      status: true,
      data: appointments,
    };
  } catch (error) {
    console.error("Error calling SP:", error.message);
    return {
      status: false,
      error: error.message,
    };
  }
};

exports.saveprescription = async (data) => {
  try {
    console.log("Medicines:", data.Medicines);
    console.log("Data received:", data);

    let prescriptionSuccess = false;
    let labTestSuccess = false;

    // Save Prescription
    if (data.Medicines && data.Medicines.trim() !== "") {
      await pool.execute(
        'CALL add_presciption(?, ?, ?)',
        [data.AppointmentID, data.Medicines, data.DoctorID]
      );
      prescriptionSuccess = true;
    }

    // Save Lab Tests
    if (data.LabTests && data.LabTests.trim() !== "") {
      await pool.execute(
        'CALL add_labtest(?, ?, ?)',
        [data.AppointmentID, data.LabTests, data.DoctorID]
      );
      labTestSuccess = true;
    }

    // Check if at least one operation was performed
    if (prescriptionSuccess || labTestSuccess) {
      return {
        status: true,
        data: "Prescription saved successfully",
      };
    } else {
      return {
        status: false,
        data: "No data provided to save",
      };
    }

  } catch (error) {
    console.error("Error calling SP:", error.message);
    return {
      status: false,
      error: error.message,
    };
  }
};

exports.getLabtests = async (data) => {
  try {
    const AppointmentID = data
    console.log("AppointmentID in service = ",AppointmentID);
    const [labTests] = await pool.execute(
      'CALL sp_get_labtests_by_appointmentID(?)',
      [AppointmentID]
    ); 
     console.log("LabTests in service = ",labTests);
    
    return {
      status: true,
      data: labTests,
    };
  } catch (error) {
    console.error("Error calling SP:", error.message);
    return {  
      status: false,
      error: error.message,
    };
  }
};
exports.updateAppointmentStatus = async (AppoinmentID) => {
  try {
    await pool.execute(
      'CALL sp_update_appointment_details(?, ?, ?)',
      [AppoinmentID, "Paid", "Official QR"]
    );  
    return {
      status: true,
      data: "Appointment status updated successfully",
    };
  } catch (error) {
    console.error("Error calling SP:", error.message);
    return {

      status: false,
      error: error.message,
    };
  }
};
exports.getTodaysAppointmentsforAdmin = async () => {
    try {
        const [appointments] = await pool.execute(
            'CALL sp_get_Today_Appointment_Admin()',
        );
        return {
            status: true,
            data: appointments,
        };
    } catch (error) {
        console.error("Error calling SP:", error.message);
        return {
            status: false,
            error: error.message,
        };
    }
};