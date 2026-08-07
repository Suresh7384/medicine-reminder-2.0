import React from "react";
import styles from "../../styles/dashboardStyles";
import ReminderCard from "./ReminderCard";

const ReminderList = ({
  reminders,
  updateReminderStatus,
  deleteReminder,
  refillStock,
  snoozeReminder,
}) => {
  if (!reminders || reminders.length === 0) {
    return (
      <div style={styles.emptyState}>
        <h3 style={styles.medicineTitle}>No reminders yet</h3>
        <p style={{ ...styles.detailText, marginTop: "6px" }}>
          Set a reminder to start tracking your medicine schedule.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.cardGrid}>
      {reminders.map((reminder) => (
        <ReminderCard
          key={reminder._id}
          reminder={reminder}
          updateReminderStatus={updateReminderStatus}
          deleteReminder={deleteReminder}
          refillStock={refillStock}
          snoozeReminder={snoozeReminder}
        />
      ))}
    </div>
  );
};

export default ReminderList;
