import React from "react";
import styles from "../../styles/dashboardStyles";

const TabletFields = ({
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
          placeholder="Paracetamol"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Available Tablets</label>
        <input
          type="number"
          placeholder="20"
          value={availableUnits}
          onChange={(e) => setAvailableUnits(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Dose Per Reminder (Tablet)</label>
        <input
          type="number"
          placeholder="1"
          value={dose}
          onChange={(e) => setDose(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Low Stock Alert</label>
        <input
          type="number"
          placeholder="5"
          value={lowStockAlert}
          onChange={(e) => setLowStockAlert(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>
    </>
  );
};

export default TabletFields;
