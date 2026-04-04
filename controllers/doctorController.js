const doctorService=require('../services/doctorServices');

exports.getDoctorDetails = async (req, res) => {
  try {
    // Await the async service function
    const doctorCode=req.body.doctor_id;

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