import {
  createReminder,
  getReminders,
  updateReminderStatus,
  deleteReminder,
  refillStock,
  snoozeReminder,
} from "../api/reminderApi";

const useReminderActions = (
  reminders,
  setReminders
) => {
  const fetchReminders = async () => {
    try {
      const { data } =
        await getReminders();

      setReminders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (
    reminderData
  ) => {
    try {
      await createReminder(reminderData);

      await fetchReminders();

      return true;
    } catch (err) {
      console.error(err);

      return false;
    }
  };

  const markTaken = async (id) => {
    try {
      await updateReminderStatus(
        id,
        "taken"
      );

      fetchReminders();
    } catch (err) {
      console.error(err);
    }
  };

  const markMissed = async (id) => {
    try {
      await updateReminderStatus(
        id,
        "missed"
      );

      fetchReminders();
    } catch (err) {
      console.error(err);
    }
  };

  const removeReminder = async (
    id
  ) => {
    try {
      await deleteReminder(id);

      fetchReminders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefill = async (
    id,
    quantity
  ) => {
    try {
      await refillStock(id, quantity);

      fetchReminders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSnooze = async (
    id,
    minutes = 10
  ) => {
    try {
      await snoozeReminder(
        id,
        minutes
      );

      fetchReminders();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    fetchReminders,

    handleCreate,

    markTaken,

    markMissed,

    removeReminder,

    handleRefill,

    handleSnooze,
  };
};

export default useReminderActions;