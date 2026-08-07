import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add JWT Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ========================
// CREATE REMINDER
// ========================

export const createReminder = (reminderData) => {
  return API.post("/api/reminders", reminderData);
};

// ========================
// GET REMINDERS
// ========================

export const getReminders = () => {
  return API.get("/api/reminders");
};

// ========================
// GET SINGLE REMINDER BY ID
// ========================

export const getReminderById = (id) => {
  return API.get(`/api/reminders/${id}`);
};

// ========================
// UPDATE STATUS
// ========================

export const updateReminderStatus = (id, data) => {
  return API.put(`/api/reminders/${id}`, data);
};

// ========================
// SNOOZE REMINDER
// ========================

export const snoozeReminder = (id) => {
  return API.put(`/api/reminders/${id}/snooze`);
};

// ========================
// DELETE REMINDER
// ========================

export const deleteReminder = (id) => {
  return API.delete(`/api/reminders/${id}`);
};

// ========================
// REFILL STOCK
// ========================

export const refillStock = (id, quantity) => {
  return API.put(`/api/reminders/${id}/refill`, {
    quantity,
  });
};

export default API;