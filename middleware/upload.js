const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR =  "../uplods";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const appointmentId = req.body.AppointmentID || "unknown";
    const dir = path.join(UPLOAD_DIR, `appointment_${appointmentId}`);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).any(); // handles dynamic field names: tests[0][file], tests[1][file] ...

module.exports = upload;