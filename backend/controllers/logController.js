const MedicineLog = require("../models/MedicineLog");

// ==========================
// Save Taken/Missed Log
// ==========================
const saveLog = async (req, res) => {
  try {
    const {
      reminderId,
      medicineName,
      medicineType,
      scheduledTime,
      status,
    } = req.body;

    const log = await MedicineLog.create({
      user: req.user.id,
      reminder: reminderId,
      medicineName,
      medicineType,
      scheduledTime,
      status,
      date: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Medicine log saved successfully",
      log,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save medicine log",
    });
  }
};

// ==========================
// Get User Logs
// ==========================
const getLogs = async (req, res) => {
  try {
    const logs = await MedicineLog.find({
      user: req.user.id,
    })
      .populate("reminder", "time")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch logs",
    });
  }
};

module.exports = {
  saveLog,
  getLogs,
};