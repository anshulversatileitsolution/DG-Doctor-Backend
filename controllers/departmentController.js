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