const express = require("express");
const router = express.Router();

const {
  createReminder,
  getReminders,
  getReminderById,
  updateStatus,
  deleteReminder,
  snoozeReminder,
  refillStock,
} = require("../controllers/reminderController");

const { protect } = require("../middleware/authMiddleware");

// Create Reminder
router.post("/", protect, createReminder);

// Get All Reminders
router.get("/", protect, getReminders);

// Get Single Reminder
router.get("/:id", protect, getReminderById);

// Update Status
router.put("/:id", protect, updateStatus);

// Snooze Reminder
router.put("/:id/snooze", protect, snoozeReminder);

// Refill Stock
router.put("/:id/refill", protect, refillStock);

// Delete Reminder
router.delete("/:id", protect, deleteReminder);

module.exports = router;