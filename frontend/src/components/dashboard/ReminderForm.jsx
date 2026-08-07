import React from "react";
import styles from "../../styles/dashboardStyles";
import MedicineTypeSelector from "../medicine/MedicineTypeSelector";
import TabletFields from "../medicine/TabletFields";
import SyrupFields from "../medicine/SyrupFields";
import EyeDropFields from "../medicine/EyeDropFields";
import InjectionFields from "../medicine/InjectionFields";
import InhalerFields from "../medicine/InhalerFields";
import CreamFields from "../medicine/CreamFields";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ReminderForm = ({
  handleCreate,

  medicineName,
  setMedicineName,

  medicineType,
  setMedicineType,

  availableUnits,
  setAvailableUnits,

  dose,
  setDose,

  eye,
  setEye,

  reminderType,
  setReminderType,

  reminderDate,
  setReminderDate,

  weekDay,
  setWeekDay,

  dayOfMonth,
  setDayOfMonth,

  customDays,
  toggleCustomDay,

  times,
  updateTime,
  addTimeField,
  removeTimeField,

  lowStockAlert,
  setLowStockAlert,
}) => {
  return (
    <section style={styles.cardPanel}>
      <h3 style={styles.sectionTitle}>
        ➕ Schedule Medication
      </h3>

      <form onSubmit={handleCreate} style={styles.form}>
        {/* Medicine Type Selector */}
        <MedicineTypeSelector
          medicineType={medicineType}
          setMedicineType={setMedicineType}
        />

        {/* Dynamic Medicine Fields */}

        {/* Tablet */}
        {medicineType === "Tablet" && (
          <TabletFields
            medicineName={medicineName}
            setMedicineName={setMedicineName}
            availableUnits={availableUnits}
            setAvailableUnits={setAvailableUnits}
            dose={dose}
            setDose={setDose}
            lowStockAlert={lowStockAlert}
            setLowStockAlert={setLowStockAlert}
          />
        )}

        {/* Syrup */}
        {medicineType === "Syrup" && (
          <SyrupFields
            medicineName={medicineName}
            setMedicineName={setMedicineName}
            availableUnits={availableUnits}
            setAvailableUnits={setAvailableUnits}
            dose={dose}
            setDose={setDose}
            lowStockAlert={lowStockAlert}
            setLowStockAlert={setLowStockAlert}
          />
        )}

        {/* Eye Drop */}
        {medicineType === "Eye Drop" && (
          <EyeDropFields
            medicineName={medicineName}
            setMedicineName={setMedicineName}
            availableUnits={availableUnits}
            setAvailableUnits={setAvailableUnits}
            dose={dose}
            setDose={setDose}
            eye={eye}
            setEye={setEye}
            lowStockAlert={lowStockAlert}
            setLowStockAlert={setLowStockAlert}
          />
        )}

        {/* Injection */}
        {medicineType === "Injection" && (
          <InjectionFields
            medicineName={medicineName}
            setMedicineName={setMedicineName}
          />
        )}

        {/* Inhaler */}
        {medicineType === "Inhaler" && (
          <InhalerFields
            medicineName={medicineName}
            setMedicineName={setMedicineName}
            availableUnits={availableUnits}
            setAvailableUnits={setAvailableUnits}
            dose={dose}
            setDose={setDose}
            lowStockAlert={lowStockAlert}
            setLowStockAlert={setLowStockAlert}
          />
        )}

        {/* Cream */}
        {medicineType === "Cream" && (
          <CreamFields
            medicineName={medicineName}
            setMedicineName={setMedicineName}
          />
        )}

        {/* Reminder Type */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Schedule Frequency
          </label>

          <select
            style={styles.select}
            value={reminderType}
            onChange={(e) => setReminderType(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="once">One Time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom Weekdays</option>
          </select>
        </div>

        {/* One Time */}
        {reminderType === "once" && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Reminder Date
            </label>

            <input
              style={styles.input}
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              required
            />
          </div>
        )}

        {/* Weekly */}
        {reminderType === "weekly" && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Day of Week
            </label>

            <select
              style={styles.select}
              value={weekDay}
              onChange={(e) => setWeekDay(e.target.value)}
              required
            >
              <option value="">Select Day</option>
              {weekDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Monthly */}
        {reminderType === "monthly" && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Day of Month
            </label>

            <input
              style={styles.input}
              type="number"
              min="1"
              max="31"
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              required
            />
          </div>
        )}

        {/* Custom */}
        {reminderType === "custom" && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Select Custom Days
            </label>

            <div style={styles.checkboxGrid}>
              {weekDays.map((day) => (
                <label key={day} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={customDays.includes(day)}
                    onChange={() => toggleCustomDay(day)}
                  />
                  {day.slice(0, 3)}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Reminder Times */}
        <hr style={styles.divider} />

        <h4 style={styles.subSectionTitle}>
          Reminder Time(s)
        </h4>

        {times.map((time, index) => (
          <div key={index} style={styles.timeRow}>
            <input
              type="time"
              style={styles.input}
              value={time}
              onChange={(e) => updateTime(index, e.target.value)}
              required
            />

            {times.length > 1 && (
              <button
                type="button"
                style={styles.removeTimeBtn}
                onClick={() => removeTimeField(index)}
              >
                ✖
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          style={styles.addTimeBtn}
          onClick={addTimeField}
        >
          + Add Another Time
        </button>

        <button type="submit" style={styles.submitBtn}>
          Save Reminder
        </button>
      </form>
    </section>
  );
};

export default ReminderForm;