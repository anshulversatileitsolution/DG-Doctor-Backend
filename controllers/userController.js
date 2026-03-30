const userService = require("../services/userService");

exports.getUsers = async (req, res) => {
  try {
    // Await the async service function
    const users = await userService.getAllUsers();

    console.log("Users Data =", users.data);

    // Check if the data array is empty
    if (!users.data || users.data.length === 0) {
      return res.status(404).json({
        message: "No records found.",
      });
    }

    // Return the users data
    res.json(users);

  } catch (error) {
    console.error("Error in getUsers controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    // Call the service
    const users = await userService.getUserById(id);

    // Check if service returned error
    if (!users.status) {
      return res.status(500).json({
        message: "Error fetching user data from API",
        error: users.error
      });
    }

    // Check if the data exists
    if (!users.data || (Array.isArray(users.data) && users.data.length === 0)) {
      return res.status(404).json({
        message: "No records found.",
      });
    }

    // Return the data
    res.json(users);

  } catch (error) {
    console.error("Error in getUserById controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
