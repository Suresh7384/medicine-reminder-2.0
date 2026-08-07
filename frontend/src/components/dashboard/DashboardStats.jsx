import { useState } from "react";
import styles from "../../styles/dashboardStyles";

// Medicine types that track a countable quantity/stock
const STOCK_TRACKED_TYPES = ["Tablet", "Syrup", "Eye Drop", "Inhaler"];

const DashboardStats = ({ reminders }) => {
  const [showLowStockList, setShowLowStockList] = useState(false);

  const total = reminders.length;

  const taken = reminders.filter(
    (item) => item.status === "taken"
  ).length;

  const missed = reminders.filter(
    (item) => item.status === "missed"
  ).length;

  const lowStockItems = reminders.filter(
    (item) =>
      STOCK_TRACKED_TYPES.includes(item.medicineType) &&
      item.availableUnits <= item.lowStockAlert
  );

  const lowStock = lowStockItems.length;

  const stats = [
    {
      icon: "💊",
      value: total,
      label: "Total Medicines",
    },
    {
      icon: "✅",
      value: taken,
      label: "Taken",
    },
    {
      icon: "❌",
      value: missed,
      label: "Missed",
    },
    {
      icon: "⚠️",
      value: lowStock,
      label: "Low Stock",
      clickable: lowStock > 0,
    },
  ];

  return (
    <div style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <div key={index}>
          <div
            style={{
              ...styles.statCard,
              cursor: stat.clickable ? "pointer" : "default",
            }}
            onClick={() =>
              stat.clickable && setShowLowStockList((prev) => !prev)
            }
          >
            <div style={styles.statIcon}>
              {stat.icon}
            </div>

            <div>
              <div style={styles.statValue}>
                {stat.value}
              </div>

              <div style={styles.statLabel}>
                {stat.label}
                {stat.clickable && (showLowStockList ? " ▲" : " ▼")}
              </div>
            </div>
          </div>

          {stat.label === "Low Stock" && showLowStockList && lowStock > 0 && (
            <div
              style={{
                ...styles.cardPanel,
                marginTop: "8px",
                padding: "14px 18px",
              }}
            >
              {lowStockItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    ...styles.stockStatusContainer,
                    padding: "6px 0",
                  }}
                >
                  <span style={styles.detailText}>{item.medicineName}</span>
                  <span style={styles.lowStockTag}>
                    {item.availableUnits} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;