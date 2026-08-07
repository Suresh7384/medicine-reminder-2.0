const mongoose = require("mongoose");

const medicineLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reminder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reminder",
      required: true,
    },

    medicineName: {
      type: String,
      required: true,
    },

    medicineType: {
      type: String,
      required: true,
    },

    scheduledTime: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Taken", "Missed"],
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MedicineLog",
  medicineLogSchema
);