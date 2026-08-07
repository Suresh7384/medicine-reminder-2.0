import styles from "../../styles/dashboardStyles";

const DashboardNavbar = ({ activeTab, setActiveTab, navigate }) => {
  return (
    <div style={styles.topNav}>
      <button
        style={
          activeTab === "reminders"
            ? styles.activeTabButton
            : styles.tabButton
        }
        onClick={() => setActiveTab("reminders")}
      >
        💊 Created Reminders
      </button>

      <button
        style={
          activeTab === "create"
            ? styles.activeTabButton
            : styles.tabButton
        }
        onClick={() => setActiveTab("create")}
      >
        ➕ Set Reminder
      </button>

      <button
        style={styles.tabButton}
        onClick={() => navigate("/history")}
      >
        📜 History
      </button>
    </div>
  );
};

export default DashboardNavbar;