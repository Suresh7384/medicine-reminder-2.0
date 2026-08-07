import { useState } from "react";

export default function useReminderState() {
  // User
  const [userName, setUserName] = useState("");

  // Reminder List
  const [reminders, setReminders] = useState([]);

  // Medicine
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");

  // Multiple reminder times
  const [times, setTimes] = useState([""]);

  // Reminder Type
  const [reminderType, setReminderType] = useState("daily");
  const [reminderDate, setReminderDate] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [customDays, setCustomDays] = useState([]);

  // Stock
  const [stock, setStock] = useState(0);
  const [dosePerReminder, setDosePerReminder] = useState(1);
  const [lowStockAlert, setLowStockAlert] = useState(5);

  return {
    // User
    userName,
    setUserName,

    // Reminder List
    reminders,
    setReminders,

    // Medicine
    medicineName,
    setMedicineName,

    dosage,
    setDosage,

    // Time
    times,
    setTimes,

    // Reminder Type
    reminderType,
    setReminderType,

    reminderDate,
    setReminderDate,

    weekDay,
    setWeekDay,

    dayOfMonth,
    setDayOfMonth,

    customDays,
    setCustomDays,

    // Stock
    stock,
    setStock,

    dosePerReminder,
    setDosePerReminder,

    lowStockAlert,
    setLowStockAlert,
  };
}