import React from "react";
import styles from "../../styles/dashboardStyles";

const medicineTypes = [
  { value: "Tablet", label: "💊 Tablet / Capsule" },
  { value: "Syrup", label: "🧴 Syrup" },
  { value: "Eye Drop", label: "👁 Eye Drop" },
  { value: "Injection", label: "💉 Injection" },
  { value: "Inhaler", label: "🌬 Inhaler" },
  { value: "Cream", label: "🧴 Cream / Ointment" },
];

const MedicineTypeSelector = ({ medicineType, setMedicineType }) => {
  return (
    <div style={styles.fieldGroup}>
      <label style={styles.fieldLabel}>Medicine Type</label>

      <select
        value={medicineType}
        onChange={(e) => setMedicineType(e.target.value)}
        style={styles.select}
      >
        <option value="">Select Medicine Type</option>

        {medicineTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MedicineTypeSelector;
