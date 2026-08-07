const PushSubscription = require("../models/PushSubscription");

// Save or update push subscription
exports.saveSubscription = async (req, res) => {
  try {
    const { subscription } = req.body;

    await PushSubscription.findOneAndUpdate(
      { user: req.user.id },
      {
        user: req.user.id,
        subscription,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Push subscription saved successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to save subscription.",
    });
  }
};