import { useMemo } from "react";

const useDashboardStats = (reminders = []) => {
  return useMemo(() => {
    const total = reminders.length;

    const taken = reminders.filter(
      (r) => r.status === "taken"
    ).length;

    const missed = reminders.filter(
      (r) => r.status === "missed"
    ).length;

    const pending = reminders.filter(
      (r) =>
        !r.status || r.status === "pending"
    ).length;

    const lowStock = reminders.filter(
      (r) =>
        Number(r.stock) <= Number(r.lowStockAlert)
    ).length;

    return {
      total,
      taken,
      missed,
      pending,
      lowStock,
    };
  }, [reminders]);
};

export default useDashboardStats;