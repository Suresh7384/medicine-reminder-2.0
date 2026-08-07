const express = require("express");
const router = express.Router();

const {
  saveLog,
  getLogs,
} = require("../controllers/logController");

const { protect } = require("../middleware/authMiddleware");

// Save medicine log
router.post("/", protect, saveLog);

// Get medicine history
router.get("/", protect, getLogs);

module.exports = router;