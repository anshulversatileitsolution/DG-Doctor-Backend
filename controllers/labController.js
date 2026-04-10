// const labService = require("../services/labService");
const labService = require('../services/labServices');

async function saveLabResults(req, res) {
  try {
    const { AppointmentID } = req.body;
    const { LABTID } = req.body;
    const { PersonID } = req.body;
    console.log("labID = ", AppointmentID);
    console.log("labID = ", LABTID);
    
 
    if (!AppointmentID) {
      return res.status(400).json({
        success: false,
        message: "AppointmentID is required",
      });
    }
 
    const tests = labService.parseTests(req.body, req.files);
 
    // Debug — remove once confirmed working
    console.log("req.body keys:", Object.keys(req.body));
    console.log("req.files:", req.files?.map(f => f.fieldname));
    console.log("parsed tests:", JSON.stringify(tests, null, 2));
 
    if (!tests || tests.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one test entry is required",
      });
    }
    console.log("AppointmentID=",AppointmentID);
    
    const savedResults = await labService.saveLabResults({
      appID: AppointmentID,
      labID: parseInt(LABTID),
      PersonID:PersonID,

      tests,
    });
 
    return res.status(200).json({
      success: true,
      message: "Lab results saved successfully",
      data: {
        appointmentId: parseInt(AppointmentID),
        totalTests: savedResults.length,
        results: savedResults,
      },
    });
  } catch (err) {
    console.error("[saveLabResults] Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}
 
module.exports = { saveLabResults };
 