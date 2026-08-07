const MedicineLog = require("../models/MedicineLog");

// ===========================
// GET USER MEDICINE HISTORY
// ===========================
exports.getHistory = async (req, res) => {
  try {
    const history = await MedicineLog.find({
      user: req.user.id,
    })
      .populate("reminder", "time")
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      message: "Unable to fetch history",
    });
  }
};