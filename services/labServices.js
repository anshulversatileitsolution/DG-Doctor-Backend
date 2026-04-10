const { pool } = require("../config/db");

/**
 * Parse tests from multipart form data.
 *
 * Multer with extended:true parses bracket notation into nested objects:
 *   tests[0][name]   → body.tests['0'].name
 *   tests[0][status] → body.tests['0'].status
 *   tests[0][file]   → handled separately via req.files
 */
function parseTests(body, files) {
  const testsMap = {};

  // body.tests is already a nested object: { '0': { name, status }, '1': ... }
  if (body.tests && typeof body.tests === "object") {
    for (const index of Object.keys(body.tests)) {
      const entry = body.tests[index];
      if (typeof entry === "object") {
        testsMap[index] = { ...entry };
      }
    }
  }

  // Attach uploaded files by index from fieldname: tests[0][file]
  if (Array.isArray(files)) {
    for (const file of files) {
      const match = file.fieldname.match(/^tests\[(\d+)\]\[file\]$/);
      if (match) {
        const index = match[1];
        if (!testsMap[index]) testsMap[index] = {};
        testsMap[index].file = file;
      }
    }
  }

  return Object.keys(testsMap)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((i) => testsMap[i]);
}

/**
 * Insert lab results into DB.
 */
async function saveLabResults({ appID, labID, PersonID, tests }) {
  var personId = PersonID;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const savedResults = [];

    for (const test of tests) {
      const { name, status, file, LAB_REPORTID } = test;

      const filePath = file?.path ?? null;
      const fileName = file?.originalname ?? null;

      console.log("Inserting lab report:", {
        appID,
        name,
        labID,
        status,
        filePath,
        personId,
        fileName,
      });
      var rows = []
       var labReportID = ""
      if (LAB_REPORTID && LAB_REPORTID > 0) {
        console.log("call for update", LAB_REPORTID,appID, name, labID, status, filePath, personId, fileName);
        
        if(status == "completed" && fileName == null){

             rows = await connection.execute(
              "CALL sp_update_labReports_by_AppointmentID_withoutFile(?, ?, ?, ?, ?, ?)",
              [LAB_REPORTID,appID, name, labID, status, personId],
            );
            console.log("rows = ",rows[0][0][0].LabReportID);
            labReportID = rows[0][0][0].LabReportID;

        }else{
         

            rows = await connection.execute(
              "CALL sp_update_labReports_by_AppointmentID(?, ?, ?, ?, ?, ?, ?,?)",
              [LAB_REPORTID,appID, name, labID, status, filePath, personId, fileName],
            );
            console.log("rows = ",rows[0][0][0].LabReportID);
            labReportID = rows[0][0][0].LabReportID;
        }

        
        
      } else {
        console.log("call for insert");
        rows = await connection.execute(
          "CALL sp_crate_lab_reports(?, ?, ?, ?, ?, ?, ?)",
          [appID, name, labID, status, filePath, personId, fileName],
        );
        console.log(rows?.[0]?.[0]);
        
         labReportID = rows[0][0][0].LabReportID;
      }

      

      if (!labReportID) {
        throw new Error(`Failed to retrieve LAB_REPORTID for test "${name}".`);
      }

      savedResults.push({
        labReportID,
        name,
        status,
      });
    }

    await connection.commit();

    return {
      status: true,
      message: "Lab reports saved successfully.",
      data: savedResults, // ✅ Returns all inserted report IDs
    };
  } catch (error) {
    await connection.rollback(); // ✅ Rolls back all inserts if any fail
    console.error("Error in saveLabResults:", error.message);

    return {
      status: false,
      message: "Failed to save lab reports.",
      error: error.message,
    };
  } finally {
    connection.release(); // ✅ Always release connection, never return here
  }
}

module.exports = { parseTests, saveLabResults };
