import React from "react";
import styles from "../../styles/dashboardStyles";

const InhalerFields = ({
  medicineName,
  setMedicineName,
  availableUnits,
  setAvailableUnits,
  dose,
  setDose,
  lowStockAlert,
  setLowStockAlert,
}) => {
  return (
    <>
      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Medicine Name</label>
        <input
          type="text"
          placeholder="Asthalin Inhaler"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Available Puffs</label>
        <input
          type="number"
          placeholder="200"
          value={availableUnits}
          onChange={(e) => setAvailableUnits(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Dose Per Reminder (Puffs)</label>
        <input
          type="number"
          placeholder="2"
          value={dose}
          onChange={(e) => setDose(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Low Stock Alert</label>
        <input
          type="number"
          placeholder="20"
          value={lowStockAlert}
          onChange={(e) => setLowStockAlert(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>
    </>
  );
};

export default InhalerFields;
