import React, { useEffect, useState } from "react";
import { getMedicineLogs } from "../api/logApi";
import { useNavigate } from "react-router-dom";
import styles, { statusPillStyle } from "../styles/dashboardStyles";

const History = () => {
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    try {
      const { data } = await getMedicineLogs();
      setLogs(data.logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) =>
    log.medicineName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.pageBackground}>
      <div style={{ ...styles.container, maxWidth: "900px" }}>
        <button style={styles.historyBackBtn} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        <h2 style={styles.historyPageTitle}>📜 Medicine History</h2>

        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.historySearchInput}
        />

        {filteredLogs.length === 0 ? (
          <div style={styles.emptyState}>
            <h3 style={styles.medicineTitle}>No history found</h3>
            <p style={{ ...styles.detailText, marginTop: "6px" }}>
              Logged doses will show up here once you mark a reminder Taken or Missed.
            </p>
          </div>
        ) : (
          <div style={styles.historyTableWrap}>
            <table style={styles.historyTable}>
              <thead>
                <tr>
                  <th style={styles.historyTableHeadCell}>Date</th>
                  <th style={styles.historyTableHeadCell}>Medicine</th>
                  <th style={styles.historyTableHeadCell}>Type</th>
                  <th style={styles.historyTableHeadCell}>Time</th>
                  <th style={styles.historyTableHeadCell}>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredLogs.map((log) => {
                  const pill = statusPillStyle(log.status);
                  return (
                    <tr key={log._id}>
                      <td style={styles.historyTableCell}>
                        {new Date(log.date).toLocaleDateString()}
                      </td>

                      <td style={{ ...styles.historyTableCell, fontWeight: "600" }}>
                        {log.medicineName}
                      </td>

                      <td style={styles.historyTableCell}>
                        {log.medicineType || "-"}
                      </td>

                      <td
                        style={{
                          ...styles.historyTableCell,
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {log.scheduledTime || log.reminder?.time || "-"}
                      </td>

                      <td style={styles.historyTableCell}>
                        <span style={pill.style}>{pill.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
