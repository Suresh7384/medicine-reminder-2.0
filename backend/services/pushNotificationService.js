const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:sureshbhunia07@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const sendPushNotification = async (
  subscription,
  title,
  message,
  reminderId
) => {
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title,
        body: message,
        reminderId,
      })
    );

    console.log("✅ Push notification sent.");
  } catch (err) {
    console.error("❌ Push Notification Error:");
    console.error(err.statusCode);
    console.error(err.body);
    console.error(err.message);
  }
};

module.exports = { sendPushNotification };