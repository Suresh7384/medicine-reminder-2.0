import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getReminderById,
  updateReminderStatus,
} from "../api/reminderApi";

const ReminderAction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reminder, setReminder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminder();
  }, [id]);

  const loadReminder = async () => {
    try {
      const { data } = await getReminderById(id);
      setReminder(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      await updateReminderStatus(id, { status });

      alert(`Medicine marked as ${status}`);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Loading...
      </div>
    );
  }

  if (!reminder) {
    return (
      <div style={{ padding: 40 }}>
        Reminder not found.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "60px auto",
        padding: 30,
        borderRadius: 10,
        boxShadow: "0 0 15px rgba(0,0,0,.15)",
        background: "#fff",
      }}
    >
      <h2>💊 Medicine Reminder</h2>

      <hr />

      <p>
        <b>Medicine:</b> {reminder.medicineName}
      </p>

      <p>
        <b>Dose:</b> {reminder.dose}
      </p>

      <p>
        <b>Time:</b>{" "}
        {Array.isArray(reminder.time) ? reminder.time.join(", ") : reminder.time}
      </p>

      <p>
        <b>Available Stock:</b> {reminder.availableUnits}
      </p>

      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 30,
        }}
      >
        <button
          onClick={() => updateStatus("taken")}
          style={{
            flex: 1,
            padding: 15,
            background: "green",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          ✅ Taken
        </button>

        <button
          onClick={() => updateStatus("missed")}
          style={{
            flex: 1,
            padding: 15,
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          ❌ Missed
        </button>
      </div>
    </div>
  );
};

export default ReminderAction;