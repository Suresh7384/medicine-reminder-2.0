import React from "react";
import styles, { statusPillStyle } from "../../styles/dashboardStyles";

const unitLabel = (medicineType) => {
  switch (medicineType) {
    case "Tablet":
      return "Tablets";
    case "Syrup":
    case "Eye Drop":
      return "ml";
    case "Inhaler":
      return "Puffs";
    default:
      return "";
  }
};

const doseLabel = (medicineType) => {
  switch (medicineType) {
    case "Tablet":
      return "Tablet";
    case "Syrup":
      return "ml";
    case "Eye Drop":
      return "Drops";
    case "Inhaler":
      return "Puff";
    default:
      return "";
  }
};

const ReminderCard = ({
  reminder,
  updateReminderStatus,
  deleteReminder,
  refillStock,
  snoozeReminder,
}) => {
  const showStock = !["Injection", "Cream"].includes(reminder.medicineType);
  const isLowStock = showStock && reminder.availableUnits <= reminder.lowStockAlert;
  const pill = statusPillStyle(reminder.status);
  const timeDisplay = Array.isArray(reminder.time)
    ? reminder.time.join(", ")
    : reminder.time;

  return (
    <div
      style={{
        ...styles.reminderCard,
        borderLeftColor:
          reminder.status === "taken"
            ? "#0E6E58"
            : reminder.status === "missed"
            ? "#B0392F"
            : "#B4712A",
      }}
    >
      <div style={styles.cardHeader}>
        <h3 style={styles.medicineTitle}>{reminder.medicineName}</h3>
        <span style={styles.badge}>{reminder.medicineType}</span>
      </div>

      {reminder.isSnoozed && (
        <div style={styles.snoozeBanner}>😴 Snoozed — will re-alert shortly</div>
      )}

      <div style={styles.cardBody}>
        <p style={styles.detailText}>
          Time <span style={styles.detailValue}>{timeDisplay}</span>
        </p>

        {showStock && (
          <>
            <p style={styles.detailText}>
              Dose{" "}
              <span style={styles.detailValue}>
                {reminder.dose} {doseLabel(reminder.medicineType)}
              </span>
            </p>
            <p style={styles.detailText}>
              Available{" "}
              <span style={styles.detailValue}>
                {reminder.availableUnits} {unitLabel(reminder.medicineType)}
              </span>
            </p>
          </>
        )}

        {reminder.medicineType === "Eye Drop" && reminder.eye && (
          <p style={styles.detailText}>
            Eye <span style={styles.detailValue}>{reminder.eye}</span>
          </p>
        )}

        <p style={styles.detailText}>
          Frequency <span style={styles.detailValue}>{reminder.reminderType}</span>
        </p>

        <div style={styles.stockStatusContainer}>
          <span style={pill.style}>{pill.label}</span>
          {isLowStock && <span style={styles.lowStockTag}>Low stock</span>}
        </div>
      </div>

      <div
        style={{
          ...styles.cardActions,
          gridTemplateColumns: showStock ? "repeat(5,1fr)" : "repeat(4,1fr)",
        }}
      >
        <button
          style={styles.btnTaken}
          onClick={() => updateReminderStatus(reminder._id, "taken")}
        >
          ✅ Taken
        </button>

        <button
          style={styles.btnMissed}
          onClick={() => updateReminderStatus(reminder._id, "missed")}
        >
          ❌ Missed
        </button>

        <button style={styles.btnSnooze} onClick={() => snoozeReminder(reminder._id)}>
          😴 Snooze
        </button>

        {showStock && (
          <button style={styles.btnRefill} onClick={() => refillStock(reminder._id)}>
            🔄 Refill
          </button>
        )}

        <button style={styles.btnDelete} onClick={() => deleteReminder(reminder._id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default ReminderCard;
