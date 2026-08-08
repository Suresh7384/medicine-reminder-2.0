const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Links reminders created together (same medicine, multiple times)
    // so they can share one stock count.
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    medicineName: {
      type: String,
      required: true,
      trim: true,
    },

    medicineType: {
      type: String,
      enum: [
        "Tablet",
        "Syrup",
        "Eye Drop",
        "Injection",
        "Inhaler",
        "Cream",
      ],
      required: true,
    },

    availableUnits: {
      type: Number,
      default: 0,
    },

    dose: {
      type: Number,
      default: 1,
    },

    eye: {
      type: String,
      enum: ["Left", "Right", "Both", ""],
      default: "",
    },

    lowStockAlert: {
      type: Number,
      default: 5,
    },

    reminderType: {
      type: String,
      enum: ["daily", "once", "weekly", "monthly", "custom"],
      default: "daily",
    },

    reminderDate: {
      type: Date,
    },

    weekDay: {
      type: String,
    },

    dayOfMonth: {
      type: Number,
    },

    customDays: {
      type: [String],
    },

    time: {
      type: [String],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "taken", "missed"],
      default: "pending",
    },

    isSnoozed: {
      type: Boolean,
      default: false,
    },

    snoozedUntil: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastTaken: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reminder", reminderSchema);