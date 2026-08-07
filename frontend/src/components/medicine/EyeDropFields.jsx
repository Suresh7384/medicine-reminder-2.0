import React from "react";
import styles from "../../styles/dashboardStyles";

const EyeDropFields = ({
  medicineName,
  setMedicineName,
  availableUnits,
  setAvailableUnits,
  dose,
  setDose,
  eye,
  setEye,
  lowStockAlert,
  setLowStockAlert,
}) => {
  return (
    <>
      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Medicine Name</label>
        <input
          type="text"
          placeholder="Refresh Tears"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Available Quantity (ml)</label>
        <input
          type="number"
          placeholder="10"
          value={availableUnits}
          onChange={(e) => setAvailableUnits(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Dose (Drops)</label>
        <input
          type="number"
          placeholder="2"
          value={dose}
          onChange={(e) => setDose(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Eye</label>
        <select value={eye} onChange={(e) => setEye(e.target.value)} style={styles.select}>
          <option value="">Select Eye</option>
          <option value="Left">Left Eye</option>
          <option value="Right">Right Eye</option>
          <option value="Both">Both Eyes</option>
        </select>
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Low Stock Alert (ml)</label>
        <input
          type="number"
          placeholder="2"
          value={lowStockAlert}
          onChange={(e) => setLowStockAlert(Number(e.target.value))}
          style={styles.fieldInput}
        />
      </div>
    </>
  );
};

export default EyeDropFields;
