const express = require("express");
const router = express.Router();

const { saveSubscription } = require("../controllers/pushController");
const { protect } = require("../middleware/authMiddleware");

router.post("/subscribe", protect, saveSubscription);

module.exports = router;