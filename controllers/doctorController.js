const doctorService = require('../services/doctorServices');

exports.getDoctorDetails = async (req, res) => {
  try {
    // Await the async service function
    const doctorCode = req.body.doctor_id;

    console.log("Doctor Code =", doctorCode);

    const doctorDetails = await doctorService.getDoctorDetails(doctorCode);

    console.log("Doctor Details =", doctorDetails.data);

    // Check if the data array is empty
    if (!doctorDetails.data || doctorDetails.data.length === 0) {
      return res.status(404).json({
        message: "No records found.",
      });
    }

    // Return the users data
    res.json(doctorDetails);

  } catch (error) {
    console.error("Error in getUsers controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getDoctorList = async (req, res) => {
  try {
    // Await the async service function


    const doctorDetails = await doctorService.getDoctorList();

    // Check if the data array is empty
    if (!doctorDetails.data || doctorDetails.data.length === 0) {
      return res.status(404).json({
        message: "No records found.",
      });
    }

    // Return the users data
    res.json(doctorDetails);

  } catch (error) {
    console.error("Error in getUsers controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
exports.addDoctor = async (req, res) => {
  try {
    // Await the async service function
    const doctorData = req.body;
    console.log("Doctor Data =", doctorData);

    const addDoctorResponse = await doctorService.addDoctor(doctorData);
    console.log("Add Doctor Response =", addDoctorResponse);

    // Check if the response indicates success    if (addDoctorResponse.success) {
    if (addDoctorResponse) {
      res.json({
        message: "Doctor added successfully",
        data: addDoctorResponse.data
      });
    } else {
      res.status(400).json({
        message: "Failed to add doctor",
        error: addDoctorResponse.error || "Unknown error"
      });
    }

  } catch (error) {
    console.error("Error in addDoctor controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
exports.updateDoctor = async (req, res) => {
  try {
    // Await the async service function
    const doctorData = req.body;
    console.log("Doctor Data =", doctorData);

    const updateDoctorResponse = await doctorService.updateDoctor(doctorData);
    console.log("Update Doctor Response =", updateDoctorResponse);
    // Check if the response indicates success
    if (updateDoctorResponse) {
      res.json({
        message: "Doctor updated successfully",
        data: updateDoctorResponse.data
      });
    } else {
      res.status(400).json({
        message: "Failed to update doctor",
        error: updateDoctorResponse.error || "Unknown error"
      });
    }
  } catch (error) {
    console.error("Error in updateDoctor controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
exports.deleteDoctor = async (req, res) => {
  try {
    // Await the async service function
    const PersonID = req.body;
    console.log("Person ID =", PersonID);
    const deleteDoctorResponse = await doctorService.deleteDoctor(PersonID);
    console.log("Delete Doctor Response =", deleteDoctorResponse);
    // Check if the response indicates success
    if (deleteDoctorResponse) {
      res.json({
        message: "Doctor deleted successfully",
        data: deleteDoctorResponse.data
      });
    } else {
      res.status(400).json({
        message: "Failed to delete doctor",
        error: deleteDoctorResponse.error || "Unknown error"
      });
    }
  } catch (error) {
    console.error("Error in deleteDoctor controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

