const mongoose = require("mongoose");
const Reminder = require("../models/Reminder");
const MedicineLog = require("../models/MedicineLog");
const User = require("../models/User");
const { sendEmail } = require("../services/emailService");

// =======================
// HELPER FUNCTIONS (DRY)
// =======================

// 1. Unified reminder fetch with security & 404 check
const findUserReminder = async (id, userId, res) => {
  const reminder = await Reminder.findOne({ _id: id, userId });
  if (!reminder) {
    res.status(404).json({ message: "Reminder not found" });
    return null;
  }
  return reminder;
};

// 2. Validate scheduling types
const validateReminderType = (type, { reminderDate, weekDay, dayOfMonth, customDays }) => {
  if (type === "once" && !reminderDate) return "Please select reminder date.";
  if (type === "weekly" && !weekDay) return "Please select week day.";
  if (type === "monthly" && !dayOfMonth) return "Please select day of month.";
  if (type === "custom" && (!customDays || customDays.length === 0)) {
    return "Please select custom weekdays.";
  }
  return null;
};

// 3. Upsert medicine log history
const upsertMedicineLog = async (reminder, status) => {
  const logStatus = status === "taken" ? "Taken" : "Missed";
  const existingLog = await MedicineLog.findOne({ reminder: reminder._id });

  if (existingLog) {
    existingLog.status = logStatus;
    existingLog.date = new Date();
    await existingLog.save();
  } else {
    await MedicineLog.create({
      user: reminder.userId,
      reminder: reminder._id,
      medicineName: reminder.medicineName,
      medicineType: reminder.medicineType,
      status: logStatus,
      date: new Date(),
    });
  }
};

// Medicine types that track a countable quantity/stock
const STOCK_TRACKED_TYPES = ["Tablet", "Syrup", "Eye Drop", "Inhaler"];

// 4. Send low stock email alert
const checkAndSendLowStockAlert = async (reminder, previousStatus, status) => {
  if (
    status === "taken" &&
    previousStatus !== "taken" &&
    STOCK_TRACKED_TYPES.includes(reminder.medicineType) &&
    reminder.availableUnits <= reminder.lowStockAlert
  ) {
    const user = await User.findById(reminder.userId);
    if (user?.email) {
      await sendEmail(
        user.email,
        "⚠ Medicine Stock Running Low",
        `Hello ${user.name},\n\nYour medicine "${reminder.medicineName}" is running low.\n\nRemaining Stock: ${reminder.availableUnits}\n\nPlease refill your medicine.\n\nStay Healthy 💙`
      );
    }
  }
};

// =======================
// CONTROLLERS
// =======================

// CREATE REMINDER
exports.createReminder = async (req, res) => {
  try {
    const {
      medicineName,
      medicineType,
      availableUnits,
      dose,
      eye,
      time,
      reminderType = "daily",
      reminderDate,
      weekDay,
      dayOfMonth,
      customDays,
      lowStockAlert,
    } = req.body;

    if (!medicineName || !medicineType || !time) {
      return res.status(400).json({
        message: "Medicine Name, Medicine Type and Time are required.",
      });
    }

    const typeError = validateReminderType(reminderType, {
      reminderDate,
      weekDay,
      dayOfMonth,
      customDays,
    });
    if (typeError) return res.status(400).json({ message: typeError });

    const reminderTimes = Array.isArray(time) ? time : [time];
    const groupId = new mongoose.Types.ObjectId();

    const createPromises = reminderTimes.map((reminderTime) =>
      Reminder.create({
        userId: req.user.id,
        groupId,
        medicineName,
        medicineType,
        availableUnits: Number(availableUnits) || 0,
        dose: Number(dose) || 0,
        eye: eye || "",
        time: [reminderTime],
        reminderType,
        reminderDate: reminderType === "once" ? reminderDate : null,
        weekDay: reminderType === "weekly" ? weekDay : null,
        dayOfMonth: reminderType === "monthly" ? dayOfMonth : null,
        customDays: reminderType === "custom" ? customDays : [],
        lowStockAlert: Number(lowStockAlert) || 5,
        status: "pending",
      })
    );

    const reminders = await Promise.all(createPromises);
    res.status(201).json(reminders);
  } catch (error) {
    console.error("Create Reminder Error:", error);
    res.status(500).json({ message: "Unable to create reminder" });
  }
};

// GET ALL USER REMINDERS
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE REMINDER BY ID
exports.getReminderById = async (req, res) => {
  try {
    const reminder = await findUserReminder(req.params.id, req.user.id, res);
    if (!reminder) return;

    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE REMINDER BY ID
exports.updateReminder = async (req, res) => {
  try {
    const reminder = await findUserReminder(req.params.id, req.user.id, res);
    if (!reminder) return;

    const fields = [
      "medicineName", "medicineType", "eye", "time", 
      "reminderType", "reminderDate", "weekDay", "dayOfMonth", "customDays"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) reminder[field] = req.body[field];
    });

    if (req.body.availableUnits !== undefined) {
      reminder.availableUnits = Number(req.body.availableUnits) || 0;
    }
    if (req.body.dose !== undefined) {
      reminder.dose = Number(req.body.dose) || 0;
    }
    if (req.body.lowStockAlert !== undefined) {
      reminder.lowStockAlert = Number(req.body.lowStockAlert) || 5;
    }

    await reminder.save();
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS (Taken / Missed)
const updateReminderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reminder = await findUserReminder(req.params.id, req.user.id, res);
    if (!reminder) return;

    const previousStatus = reminder.status;
    reminder.status = status;
    reminder.isSnoozed = false;
    reminder.snoozedUntil = null;

    // Stock is shared across every reminder time-slot for the same
    // medicine (same groupId), so adjust and sync it across all of them.
    if (STOCK_TRACKED_TYPES.includes(reminder.medicineType)) {
      let newStock = reminder.availableUnits;

      if (status === "taken" && previousStatus !== "taken") {
        newStock = Math.max(0, reminder.availableUnits - reminder.dose);
      }
      if (status === "missed" && previousStatus === "taken") {
        newStock = reminder.availableUnits + reminder.dose;
      }

      if (newStock !== reminder.availableUnits) {
        await Reminder.updateMany(
          { groupId: reminder.groupId },
          { availableUnits: newStock }
        );
        reminder.availableUnits = newStock;
      }
    }

    await reminder.save();
    await upsertMedicineLog(reminder, status);
    await checkAndSendLowStockAlert(reminder, previousStatus, status);

    res.json(reminder);
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Unable to update reminder" });
  }
};

exports.updateReminderStatus = updateReminderStatus;
exports.updateStatus = updateReminderStatus;

// SNOOZE REMINDER (10 Minutes)
exports.snoozeReminder = async (req, res) => {
  try {
    const reminder = await findUserReminder(req.params.id, req.user.id, res);
    if (!reminder) return;

    const snoozeTime = new Date();
    snoozeTime.setMinutes(snoozeTime.getMinutes() + 10);

    reminder.isSnoozed = true;
    reminder.snoozedUntil = snoozeTime;

    await reminder.save();
    res.json({ message: "Reminder snoozed for 10 minutes.", reminder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE REMINDER
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await findUserReminder(req.params.id, req.user.id, res);
    if (!reminder) return;

    await reminder.deleteOne();
    res.json({ message: "Reminder deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REFILL STOCK
exports.refillStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const reminder = await findUserReminder(req.params.id, req.user.id, res);
    if (!reminder) return;

    // Update all reminders matching the user and medicine name
    const matchingReminders = await Reminder.find({
      userId: req.user.id,
      medicineName: reminder.medicineName,
    });

    const addQty = Number(quantity) || 0;
    matchingReminders.forEach((r) => {
      r.availableUnits += addQty;
    });

    await Promise.all(matchingReminders.map((r) => r.save()));

    res.json({
      message: "Stock refilled successfully",
      stock: matchingReminders[0]?.availableUnits ?? reminder.availableUnits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};