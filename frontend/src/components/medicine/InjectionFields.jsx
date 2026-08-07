import React from "react";
import styles from "../../styles/dashboardStyles";

const InjectionFields = ({ medicineName, setMedicineName }) => {
  return (
    <>
      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Medicine Name</label>
        <input
          type="text"
          placeholder="Insulin"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          style={styles.fieldInput}
        />
      </div>

      <div style={styles.infoNote}>Stock quantity is not tracked for Injection.</div>
    </>
  );
};

export default InjectionFields;
