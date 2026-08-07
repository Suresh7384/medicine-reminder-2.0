const Reminder = require("../models/Reminder");
const PushSubscription = require("../models/PushSubscription");
const MedicineLog = require("../models/MedicineLog");

const { sendEmail } = require("../services/emailService");
const { sendPushNotification } = require("../services/pushNotificationService");
const { sendSMS } = require("../services/smsService");

function getReminderMessage(reminder) {
  switch (reminder.medicineType) {
    case "Tablet":
      return `Take ${reminder.dose} tablet of ${reminder.medicineName}.`;

    case "Syrup":
      return `Take ${reminder.dose} ml of ${reminder.medicineName}.`;

    case "Eye Drop":
      return `Put ${reminder.dose} drops of ${reminder.medicineName} in ${reminder.eye || "eye"}.`;

    case "Inhaler":
      return `Take ${reminder.dose} puff(s) of ${reminder.medicineName}.`;

    case "Injection":
      return `Time to take your ${reminder.medicineName} injection.`;

    case "Cream":
      return `Apply ${reminder.medicineName}.`;

    default:
      return `Time to take ${reminder.medicineName}.`;
  }
}

const startCron = () => {
  // Runs every 60 seconds (1 minute)
  setInterval(async () => {
    console.log("Cron Running...");

    try {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
      const todayName = now.toLocaleDateString("en-US", { weekday: "long" });
      const todayDate = now.getDate();

      // Calculate start and end of current day for querying MedicineLog
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      );

      const reminders = await Reminder.find().populate("userId");

      for (const reminder of reminders) {
        const user = reminder.userId;
        if (!user) continue;

        let shouldSend = false;

        // Check standard schedules
        const timeMatches =
          Array.isArray(reminder.time)
            ? reminder.time.includes(currentTime)
            : reminder.time === currentTime;

        switch (reminder.reminderType) {
          case "daily":
            shouldSend = timeMatches;
            break;

          case "once":
            if (reminder.reminderDate) {
              const d = new Date(reminder.reminderDate);
              shouldSend =
                timeMatches &&
                d.getFullYear() === now.getFullYear() &&
                d.getMonth() === now.getMonth() &&
                d.getDate() === now.getDate();
            }
            break;

          case "weekly":
            shouldSend = timeMatches && reminder.weekDay === todayName;
            break;

          case "monthly":
            shouldSend = timeMatches && reminder.dayOfMonth === todayDate;
            break;

          case "custom":
            shouldSend =
              timeMatches &&
              reminder.customDays &&
              reminder.customDays.includes(todayName);
            break;

          default:
            break;
        }

        // If scheduled time matches now, clear active snooze flag so it behaves as a fresh reminder
        if (shouldSend) {
          reminder.isSnoozed = false;
          reminder.snoozedUntil = null;
        }

        // Check snooze expiration
        if (
          !shouldSend &&
          reminder.status === "pending" &&
          reminder.isSnoozed &&
          reminder.snoozedUntil &&
          now >= new Date(reminder.snoozedUntil)
        ) {
          shouldSend = true;
        }

        if (!shouldSend) continue;

        // Skip if reminder was snoozed but snooze time is still in the future
        if (
          reminder.isSnoozed &&
          reminder.snoozedUntil &&
          now < new Date(reminder.snoozedUntil)
        ) {
          continue;
        }

        console.log(`Sending reminder for: ${reminder.medicineName}`);

        const reminderMessage = getReminderMessage(reminder);

        // Send Email
        if (user.email) {
          await sendEmail(
            user.email,
            "💊 Medicine Reminder",
            `Hello ${user.name},\n\n${reminderMessage}\n\nPlease take your medicine.\n\nIf you are busy, you can Snooze the reminder for 10 minutes from the website.\n\nStay Healthy 💙`
          );
        }

        // Send SMS
        if (user.phone && typeof sendSMS === "function") {
          await sendSMS(user.phone, reminderMessage);
        }

        // Send Push Notifications
        const subscriptions = await PushSubscription.find({ user: user._id });
        for (const sub of subscriptions) {
          await sendPushNotification(
            sub.subscription,
            "💊 Medicine Reminder",
            reminderMessage,
            reminder._id
          );
        }

        // Set auto-snooze after sending notifications
        reminder.isSnoozed = true;
        reminder.snoozedUntil = new Date(Date.now() + 10 * 60 * 1000);
        await reminder.save();

        // Check if a log entry was already created today
        const alreadySent = await MedicineLog.findOne({
          user: user._id,
          reminder: reminder._id,
          date: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        });

        // Create history log only once per day
        if (!alreadySent) {
          await MedicineLog.create({
            user: user._id,
            reminder: reminder._id,
            medicineName: reminder.medicineName,
            medicineType: reminder.medicineType,
            scheduledTime: Array.isArray(reminder.time)
              ? reminder.time.join(", ")
              : reminder.time,
            status: "Pending",
            date: now,
          });
        }
      }
    } catch (error) {
      console.error("Cron Error:", error.message);
    }
  }, 60000);
};

module.exports = startCron;