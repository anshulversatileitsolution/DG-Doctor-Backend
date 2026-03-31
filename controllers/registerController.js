const registerService = require("../services/registerService");

exports.createUser = async (req, res) => {
  try {
    // Await the async service function

    console.log(req.body)
    const input = req.body
    const users = await registerService.addUser(input);

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


