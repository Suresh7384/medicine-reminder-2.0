import React from "react";
import styles from "../../styles/dashboardStyles";

const SyrupFields = ({
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
          placeholder="Benadryl"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Available Quantity (ml)</label>
        <input
          type="number"
          placeholder="100"
          value={availableUnits}
          onChange={(e) => setAvailableUnits(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Dose Per Reminder (ml)</label>
        <input
          type="number"
          placeholder="10"
          value={dose}
          onChange={(e) => setDose(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Low Stock Alert (ml)</label>
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

export default SyrupFields;
