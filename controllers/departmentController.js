const departmentService = require("../services/departmentServices");

exports.getDepartmentList = async (req, res) => {
    try {
        // Await the async service function


        const departmentDetails = await departmentService.getDepartmentList();

        // Check if the data array is empty
        if (!departmentDetails.data || departmentDetails.data.length === 0) {
            return res.status(404).json({
                message: "No records found.",
            });
        }

        // Return the users data
        res.json(departmentDetails);

    } catch (error) {
        console.error("Error in getDepartmentList controller:", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
exports.addDepartment = async (req, res) => {
    try {
        // Await the async service function
        const departmentData = req.body;
        console.log("Department Data =", departmentData);

        const addDepartmentResponse = await departmentService.addDepartment(departmentData);
        console.log("Add Department Response =", addDepartmentResponse);

        // Check if the response indicates success
        if (addDepartmentResponse) {
            res.json({
                message: "Department added successfully",
                data: addDepartmentResponse.data
            });
        } else {
            res.status(400).json({
                message: "Failed to add department",
                error: addDepartmentResponse.error || "Unknown error"
            });
        }

    } catch (error) {
        console.error("Error in addDepartment controller:", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        // Await the async service function
        const departmentData = req.body;
        console.log("Department Data =", departmentData);   
        const updateDepartmentResponse = await departmentService.updateDepartment(departmentData);
        console.log("Update Department Response =", updateDepartmentResponse);
        // Check if the response indicates success
        if (updateDepartmentResponse) {
            res.json({  
                message: "Department updated successfully",
                data: updateDepartmentResponse.data
            });
        } else {
            res.status(400).json({
                message: "Failed to update department",
                error: updateDepartmentResponse.error || "Unknown error"
            });
        }
    } catch (error) {
        console.error("Error in updateDepartment controller:", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.deleteDepartment = async (req, res) => {
  try {
    // Await the async service function 
    const { DepartmentID } = req.body;
    console.log("DepartmentID =", DepartmentID);   
    const deleteDepartmentResponse = await departmentService.deleteDepartment(DepartmentID);
    console.log("Delete Department Response =", deleteDepartmentResponse);
    // Check if the response indicates success
    if (deleteDepartmentResponse) {
        res.json({
            message: "Department deleted successfully",
            data: deleteDepartmentResponse.data
        });
    } else {
        res.status(400).json({
            message: "Failed to delete department",
            error: deleteDepartmentResponse.error || "Unknown error"
        });
    }
} catch (error) {
    console.error("Error in deleteDepartment controller:", error.message);
    res.status(500).json({
        message: "Internal server error",
        error: error.message
    });
};
}