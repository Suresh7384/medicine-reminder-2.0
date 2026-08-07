import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createReminder,
  getReminders,
  updateReminderStatus,
  deleteReminder,
  snoozeReminder,
  refillStock,
} from "../api/reminderApi";

import { registerForPushNotifications } from "../utils/notification";
import { getCurrentUser } from "../api/authApi";

import styles from "../styles/dashboardStyles";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import ReminderForm from "../components/dashboard/ReminderForm";
import ReminderList from "../components/dashboard/ReminderList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reminders");

  const [userName, setUserName] = useState("");
  const [reminders, setReminders] = useState([]);

  const [medicineName, setMedicineName] = useState("");
  const [medicineType, setMedicineType] = useState("");
  const [availableUnits, setAvailableUnits] = useState(0);
  const [dose, setDose] = useState(1);
  const [eye, setEye] = useState("");

  // Multiple reminder times
  const [times, setTimes] = useState([""]);

  const [reminderType, setReminderType] = useState("daily");
  const [reminderDate, setReminderDate] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [customDays, setCustomDays] = useState([]);

  const [lowStockAlert, setLowStockAlert] = useState(5);

  const fetchReminders = async () => {
    try {
      const { data } = await getReminders();

      console.log("Reminders:", data);

      setReminders(data);
    } catch (err) {
      console.error("Error fetching reminders:", err);
    }
  };

  const loadUser = async () => {
    try {
      const { data } = await getCurrentUser();
      setUserName(data.name);
    } catch (err) {
      console.error("Error loading user details:", err);
    }
  };

  useEffect(() => {
    fetchReminders();
    loadUser();

    const initPush = async () => {
      const alreadyRegistered = localStorage.getItem("pushRegistered");

      if (!alreadyRegistered) {
        await registerForPushNotifications();
        localStorage.setItem("pushRegistered", "true");
      }
    };

    initPush();
  }, []);

  const addTimeField = () => {
    setTimes([...times, ""]);
  };

  const removeTimeField = (index) => {
    const temp = [...times];
    temp.splice(index, 1);
    setTimes(temp);
  };

  const updateTime = (index, value) => {
    const temp = [...times];
    temp[index] = value;
    setTimes(temp);
  };

  const toggleCustomDay = (day) => {
    if (customDays.includes(day)) {
      setCustomDays(customDays.filter((d) => d !== day));
    } else {
      setCustomDays([...customDays, day]);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createReminder({
        medicineName,
        medicineType,
        availableUnits,
        dose,
        eye,
        time: times,
        reminderType,
        reminderDate,
        weekDay,
        dayOfMonth,
        customDays,
        lowStockAlert,
      });

      // Reset form fields
      setMedicineName("");
      setMedicineType("");
      setAvailableUnits(0);
      setDose(1);
      setEye("");
      setTimes([""]);
      setReminderType("daily");
      setReminderDate("");
      setWeekDay("");
      setDayOfMonth("");
      setCustomDays([]);
      setLowStockAlert(5);

      fetchReminders();
      setActiveTab("reminders");
    } catch (error) {
      console.error("Error creating reminder:", error);
      alert("Failed to create reminder.");
    }
  };

  const markTaken = async (id) => {
    try {
      await updateReminderStatus(id, { status: "taken" });
      fetchReminders();
    } catch (err) {
      console.error("Error marking reminder as taken:", err);
    }
  };

  const markMissed = async (id) => {
    try {
      await updateReminderStatus(id, { status: "missed" });
      fetchReminders();
    } catch (err) {
      console.error("Error marking reminder as missed:", err);
    }
  };

  const handleSnooze = async (id) => {
    try {
      await snoozeReminder(id);
      alert("Reminder Snoozed for 10 minutes 😴");
      fetchReminders();
    } catch (error) {
      console.error("Snooze Error:", error);
      alert("Unable to snooze reminder.");
    }
  };

  const handleRefill = async (id) => {
    const qty = prompt("Enter refill quantity:");

    if (!qty || Number(qty) <= 0) return;

    try {
      await refillStock(id, Number(qty));
      fetchReminders();
      alert("Stock refilled successfully.");
    } catch (error) {
      console.error("Refill Error:", error);
      alert("Unable to refill stock.");
    }
  };

  const removeReminder = async (id) => {
    if (!window.confirm("Delete reminder?")) return;

    try {
      await deleteReminder(id);
      fetchReminders();
    } catch (err) {
      console.error("Error deleting reminder:", err);
    }
  };

  const lowStockCount = Array.isArray(reminders)
    ? reminders.filter(
        (r) => Number(r.availableUnits ?? r.stock) <= Number(r.lowStockAlert)
      ).length
    : 0;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <DashboardHeader
          userName={userName}
          navigate={navigate}
        />

        <DashboardStats
          reminders={reminders}
          lowStockCount={lowStockCount}
        />

        <DashboardNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigate={navigate}
        />

        <div style={styles.layoutGrid}>
          {activeTab === "create" && (
            <ReminderForm
              handleCreate={handleCreate}
              medicineName={medicineName}
              setMedicineName={setMedicineName}
              medicineType={medicineType}
              setMedicineType={setMedicineType}
              availableUnits={availableUnits}
              setAvailableUnits={setAvailableUnits}
              dose={dose}
              setDose={setDose}
              eye={eye}
              setEye={setEye}
              reminderType={reminderType}
              setReminderType={setReminderType}
              reminderDate={reminderDate}
              setReminderDate={setReminderDate}
              weekDay={weekDay}
              setWeekDay={setWeekDay}
              dayOfMonth={dayOfMonth}
              setDayOfMonth={setDayOfMonth}
              customDays={customDays}
              toggleCustomDay={toggleCustomDay}
              times={times}
              updateTime={updateTime}
              addTimeField={addTimeField}
              removeTimeField={removeTimeField}
              lowStockAlert={lowStockAlert}
              setLowStockAlert={setLowStockAlert}
            />
          )}

          {activeTab === "reminders" && (
            <ReminderList
              reminders={reminders}
              updateReminderStatus={(id, status) => {
                if (status === "taken") markTaken(id);
                else markMissed(id);
              }}
              deleteReminder={removeReminder}
              refillStock={handleRefill}
              snoozeReminder={handleSnooze}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;