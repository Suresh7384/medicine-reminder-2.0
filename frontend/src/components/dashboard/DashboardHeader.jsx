import styles from "../../styles/dashboardStyles";

const DashboardHeader = ({ userName, navigate }) => {
  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.welcomeHeading}>
          Welcome,
          <span style={styles.userNameHighlight}>
            {" "}
            {userName || "User"}
          </span>
        </h1>

        <p style={styles.subHeading}>
          Manage your medicine reminders easily.
        </p>
      </div>

      <button
        style={styles.historyBtn}
        onClick={() => navigate("/history")}
      >
        📜 History
      </button>
    </div>
  );
};

export default DashboardHeader;