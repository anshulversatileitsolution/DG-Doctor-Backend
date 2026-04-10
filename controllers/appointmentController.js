const appointmentService = require("../services/appointmentServices");
const registerService = require("../services/registerService");

exports.bookAppointment = async (req, res) => {
  try {
    console.log(req.body.PersonID);

    const {
      PersonID,
      FirstName,
      Lastname,
      DOB,
      BloodGroup,
      Gender,
      Mobile,
      phone,
      email,
      ReasonForVisit,
      SelfRelative,
      DoctorID,
      DocFname,
      DocLname,
      DepartmentName,
      AppointmentDate,
      AppointmentTime,
      QR_Type,
      PaymentStatus,
      OPD_Fees,
    } = req.body;

    const appointmentData = {
      PersonID: req.body.PersonID,
      DoctorID: req.body.DoctorID,
      ReasonForVisit: req.body.ReasonForVisit,
      SelfRelative: req.body.SelfRelative,
      AppointmentDate: req.body.AppointmentDate,
      AppointmentTime: req.body.AppointmentTime,
      QR_Type: req.body.QR_Type,
      PaymentStatus: req.body.PaymentStatus,
      OPD_Fees: req.body.OPD_Fees,
      CreatedBy: req.body.PersonID,
    };

    const personData = {
      first_name: req.body.FirstName,
      last_name: req.body.Lastname,
      dob: req.body.DOB,
      blood_group: req.body.BloodGroup,
      gender: req.body.Gender,
      user_type: "patient",
      mobile: req.body.Mobile,
      password: req.body.Mobile,
      email: req.body.email,
    };

    let bookAppointment;
    var deletedata = 0
    var UserIDdelete = ""

    if (PersonID != null) {
      if (SelfRelative === "relative") {
        deletedata = 1
        const newUser = await registerService.addUser(personData);
        console.log("newUser = ", newUser);

        const relativeAppointmentData = {
          ...appointmentData,
          PersonID: newUser.data.userId,
          CreatedBy: req.body.PersonID,
        };
        UserIDdelete =  newUser.data.userId

        bookAppointment =
          await appointmentService.bookAppointment(relativeAppointmentData);
      } else {
        bookAppointment =
          await appointmentService.bookAppointment(appointmentData);
      }
    } else {
      console.log("Adding new user... = ", personData);
        deletedata = 1
      const newUser = await registerService.addUser(personData);
      UserIDdelete =  newUser.data.userId
      appointmentData.PersonID = newUser.data.userId;
      appointmentData.CreatedBy = newUser.data.userId;

      bookAppointment =
        await appointmentService.bookAppointment(appointmentData);
      console.log("bookAppointment = ", bookAppointment);
    }
    console.log("check for response = ",bookAppointment);
    
    // ✅ Check if appointment ID exists in the response
    const appointmentId =
      bookAppointment?.data?.appointmentId ??   // adjust key based on your actual response shape
      bookAppointment?.appointmentId ??
      null;

    if (appointmentId) {
      return res.status(200).json({
        success: true,
        message: "Appointment booked successfully",
        data: bookAppointment,
      });
    } else {
        if(deletedata == 1){
           var  deleteUser =
            await appointmentService.deleteuser(UserIDdelete);
            console.log("deleteUser = ", deleteUser);
        }

      return res.status(500).json({
        success: false,
        message: "Appointment booking failed: No appointment ID returned",
        data: bookAppointment,
      });
    }
  } catch (error) {
    console.error("Error in bookAppointment controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.getAppointmentByPatientID = async (req, res) => {
  try {
    const { PersonID } = req.body;
    const appointments =
      await appointmentService.getAppointmentByPatientID(PersonID);
    res.json(appointments);
  } catch (error) {
    console.error(
      "Error in getAppointmentByPatientID controller:",
      error.message,
    );
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getprescription = async (req, res) => {
  try {
    var data = req.body;
    const appointments = await appointmentService.getprescription(
      data.AppointmentID,
    );
    res.json(appointments);
  } catch (error) {
    console.error(
      "Error in getAppointmentByPatientID controller:",
      error.message,
    );
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.saveprescription = async (req, res) => {
  try {
    console.log(req);

    var data = req.body;
    console.log("controller = ", data);

    const appointments = await appointmentService.saveprescription(data);
    res.json(appointments);
  } catch (error) {
    console.error(
      "Error in getAppointmentByPatientID controller:",
      error.message,
    );
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getTodayDoctorAppointmentsbyDoctorID = async (req, res) => {
  try {
    const { DoctorID } = req.body;
    const appointments =
      await appointmentService.getTodayDoctorAppointmentsbyDoctorID(DoctorID);
    res.json(appointments);
  } catch (error) {
    console.error(
      "Error in getTodayDoctorAppointmentsbyDoctorID controller:",
      error.message,
    );
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.getLabtests = async (req, res) => {
  try {
    const { AppointmentID } = req.body;
    console.log("AppointmentID in controller = ", AppointmentID);
    const labtests = await appointmentService.getLabtests(AppointmentID);
    res.json(labtests);
  } catch (error) {
    console.error("Error in getLabtests controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.updateAppointmentStatus = async (req, res) => {
  try {
    var data = req.body;
    console.log("AppointmentID in controller = ", data);
    const updateStatus = await appointmentService.updateAppointmentStatus(
      data.AppointmentID,
    );
    res.json(updateStatus);
  } catch (error) {
    console.error(
      "Error in updateAppointmentStatus controller:",
      error.message,
    );
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.UpdateQR = async (req, res) => {
  try {
    var data = req.body;
    console.log("AppointmentID in controller = ", data);
    const updateStatus = await appointmentService.UpdateQR(data);
    res.json(updateStatus);
  } catch (error) {
    console.error(
      "Error in updateAppointmentStatus controller:",
      error.message,
    );
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getQRDetails = async (req, res) => {
  try {
    const { AppointmentID } = req.body;
    console.log("AppointmentID in controller = ", AppointmentID);
    const labtests = await appointmentService.getQRDetails(AppointmentID);
    res.json(labtests);
  } catch (error) {
    console.error("Error in getLabtests controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.getAppointmentListbyDoctorID = async (req, res) => {
  try {
    const { DoctorID } = req.body;
    console.log("DoctorID in controller = ", DoctorID);
    const appointments =
      await appointmentService.getAppointmentListbyDoctorID(DoctorID);
    res.json(appointments);
  } catch (error) {
    console.error(
      "Error in getAppointmentListbyDoctorID controller:",
      error.message,
    );
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
