const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const labController = require("../controllers/labController");

// POST /api/lab/tests
router.post("/tests", upload, labController.saveLabResults);

module.exports = router;