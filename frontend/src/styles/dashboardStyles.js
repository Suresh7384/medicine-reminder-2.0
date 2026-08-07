// ============================================================
// Design tokens
// Palette: pine teal (trust/calm) + soft sage canvas + muted
// clay/brick accents for caution & danger states — deliberately
// avoiding the generic cream/terracotta AI-default palette.
// Type: Fraunces (display, warm & human) + Inter (body) +
// IBM Plex Mono (dosage figures / stat numerals — precision).
// ============================================================

const tokens = {
  ink: "#16241F",
  canvas: "#EFF4F1",
  surface: "#FFFFFF",
  primary: "#0E6E58",
  primaryDark: "#0A5747",
  primaryTint: "#DCEEE6",
  amber: "#B4712A",
  amberTint: "#F6E9DA",
  coral: "#B0392F",
  coralTint: "#F6DEDB",
  blue: "#2A5F92",
  blueTint: "#E0EAF3",
  muted: "#5B6F68",
  border: "#DDE7E2",
  display: "'Fraunces', Georgia, serif",
  body: "'Inter', 'Segoe UI', sans-serif",
  mono: "'IBM Plex Mono', 'Courier New', monospace",
};

const styles = {
  pageBackground: {
    backgroundColor: tokens.canvas,
    minHeight: "100vh",
    padding: "36px 24px",
    fontFamily: tokens.body,
    color: tokens.ink,
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  // ---------------- Header ----------------
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: tokens.surface,
    padding: "28px 32px",
    borderRadius: "16px",
    border: `1px solid ${tokens.border}`,
    boxShadow: "0 1px 2px rgba(22,36,31,.04), 0 8px 24px rgba(22,36,31,.05)",
    marginBottom: "24px",
  },

  welcomeHeading: {
    margin: 0,
    fontFamily: tokens.display,
    fontSize: "30px",
    fontWeight: "600",
    color: tokens.ink,
    letterSpacing: "-0.01em",
  },

  userNameHighlight: {
    color: tokens.primary,
    fontStyle: "italic",
  },

  subHeading: {
    margin: "6px 0 0 0",
    color: tokens.muted,
    fontSize: "14px",
  },

  historyBtn: {
    backgroundColor: tokens.primaryTint,
    color: tokens.primaryDark,
    border: "none",
    padding: "12px 22px",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    letterSpacing: ".01em",
    transition: "transform .15s ease, box-shadow .15s ease",
  },

  // ---------------- Tabs ----------------
  topNav: {
    display: "flex",
    gap: "8px",
    marginBottom: "24px",
    background: tokens.surface,
    padding: "8px",
    borderRadius: "999px",
    border: `1px solid ${tokens.border}`,
    boxShadow: "0 1px 2px rgba(22,36,31,.03)",
    width: "fit-content",
  },

  tabButton: {
    padding: "11px 22px",
    border: "none",
    borderRadius: "999px",
    background: "transparent",
    color: tokens.muted,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all .2s ease",
  },

  activeTabButton: {
    padding: "11px 22px",
    border: "none",
    borderRadius: "999px",
    background: tokens.primary,
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 4px 10px rgba(14,110,88,.25)",
  },

  // ---------------- Stats ----------------
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "16px",
    marginBottom: "24px",
  },

  statCard: {
    background: tokens.surface,
    padding: "22px 24px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    border: `1px solid ${tokens.border}`,
    boxShadow: "0 1px 2px rgba(22,36,31,.03)",
  },

  statIcon: {
    fontSize: "22px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: tokens.primaryTint,
    flexShrink: 0,
  },

  statValue: {
    fontFamily: tokens.mono,
    fontSize: "24px",
    fontWeight: "600",
    color: tokens.ink,
    lineHeight: 1.1,
  },

  statLabel: {
    fontSize: "12.5px",
    color: tokens.muted,
    marginTop: "2px",
    textTransform: "uppercase",
    letterSpacing: ".04em",
  },

  // ---------------- Layout ----------------
  layoutGrid: {
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: "24px",
    alignItems: "start",
  },

  cardPanel: {
    background: tokens.surface,
    padding: "26px",
    borderRadius: "16px",
    border: `1px solid ${tokens.border}`,
    boxShadow: "0 1px 2px rgba(22,36,31,.03)",
  },

  sectionTitle: {
    margin: "0 0 20px",
    fontFamily: tokens.display,
    fontSize: "20px",
    fontWeight: "600",
    color: tokens.ink,
  },

  subSectionTitle: {
    margin: "18px 0 12px",
    fontSize: "12.5px",
    color: tokens.primary,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: ".05em",
  },

  // ---------------- Form ----------------
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "11.5px",
    fontWeight: "700",
    color: tokens.muted,
    textTransform: "uppercase",
    letterSpacing: ".06em",
  },

  input: {
    padding: "11px 14px",
    borderRadius: "10px",
    border: `1px solid ${tokens.border}`,
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    background: tokens.canvas,
    color: tokens.ink,
  },

  select: {
    padding: "11px 14px",
    borderRadius: "10px",
    border: `1px solid ${tokens.border}`,
    fontSize: "14px",
    background: tokens.canvas,
    color: tokens.ink,
  },

  timeRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "6px",
  },

  addTimeBtn: {
    background: "transparent",
    border: `1.5px dashed ${tokens.primary}`,
    color: tokens.primary,
    padding: "9px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
  },

  removeTimeBtn: {
    background: tokens.coralTint,
    color: tokens.coral,
    border: "none",
    borderRadius: "8px",
    padding: "0 14px",
    cursor: "pointer",
    fontWeight: "600",
  },

  checkboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "8px",
  },

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12.5px",
    color: tokens.ink,
  },

  divider: {
    border: "none",
    borderTop: `1px solid ${tokens.border}`,
    margin: "14px 0",
  },

  submitBtn: {
    background: tokens.primary,
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "8px",
    boxShadow: "0 6px 16px rgba(14,110,88,.25)",
    transition: "transform .15s ease",
  },

  // ---------------- Reminder list ----------------
  emptyState: {
    background: tokens.surface,
    padding: "56px 32px",
    borderRadius: "16px",
    textAlign: "center",
    border: `1px dashed ${tokens.border}`,
    color: tokens.muted,
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
    gap: "18px",
  },

  reminderCard: {
    background: tokens.surface,
    borderRadius: "16px",
    padding: "22px",
    borderLeft: `5px solid ${tokens.primary}`,
    border: `1px solid ${tokens.border}`,
    borderLeftWidth: "5px",
    boxShadow: "0 1px 2px rgba(22,36,31,.03)",
    transition: "transform .15s ease, box-shadow .15s ease",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "14px",
    gap: "12px",
  },

  medicineTitle: {
    margin: 0,
    fontFamily: tokens.display,
    fontSize: "19px",
    fontWeight: "600",
    color: tokens.ink,
  },

  // Pill/capsule-shaped badge — echoes the medicine subject itself
  badge: {
    background: tokens.primaryTint,
    color: tokens.primaryDark,
    fontSize: "11px",
    padding: "5px 14px",
    borderRadius: "999px",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: ".04em",
    whiteSpace: "nowrap",
  },

  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    marginBottom: "18px",
  },

  detailText: {
    margin: 0,
    fontSize: "13.5px",
    color: tokens.muted,
  },

  detailValue: {
    fontFamily: tokens.mono,
    color: tokens.ink,
    fontWeight: "600",
  },

  stockStatusContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
  },

  lowStockTag: {
    background: tokens.coralTint,
    color: tokens.coral,
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "700",
  },

  snoozeBanner: {
    background: tokens.amberTint,
    color: tokens.amber,
    padding: "9px 12px",
    borderRadius: "10px",
    marginBottom: "14px",
    fontSize: "12.5px",
    fontWeight: "700",
  },

  cardActions: {
    display: "grid",
    gridTemplateColumns: "repeat(5,1fr)",
    gap: "8px",
    marginTop: "16px",
  },

  btnTaken: {
    background: tokens.primary,
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12.5px",
  },

  btnMissed: {
    background: tokens.coral,
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12.5px",
  },

  btnSnooze: {
    background: tokens.amberTint,
    color: tokens.amber,
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12.5px",
  },

  btnRefill: {
    background: tokens.blueTint,
    color: tokens.blue,
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12.5px",
  },

  btnDelete: {
    background: "transparent",
    color: tokens.coral,
    border: `1px solid ${tokens.coralTint}`,
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12.5px",
  },

  loading: {
    textAlign: "center",
    padding: "60px",
    fontSize: "16px",
    color: tokens.muted,
  },

  error: {
    color: tokens.coral,
    textAlign: "center",
    padding: "20px",
    fontWeight: "600",
  },

  // ---------------- Shared form field note ----------------
  infoNote: {
    background: tokens.canvas,
    border: `1px dashed ${tokens.border}`,
    padding: "12px 14px",
    borderRadius: "10px",
    color: tokens.muted,
    fontSize: "13px",
  },

  fieldLabel: {
    display: "block",
    marginBottom: "6px",
    fontSize: "11.5px",
    fontWeight: "700",
    color: tokens.muted,
    textTransform: "uppercase",
    letterSpacing: ".06em",
  },

  fieldInput: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: `1px solid ${tokens.border}`,
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
    background: tokens.canvas,
    color: tokens.ink,
  },

  fieldGroup: {
    marginBottom: "16px",
  },

  // ---------------- History page ----------------
  historyBackBtn: {
    background: tokens.surface,
    color: tokens.ink,
    border: `1px solid ${tokens.border}`,
    padding: "10px 18px",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13.5px",
    marginBottom: "20px",
  },

  historyPageTitle: {
    fontFamily: tokens.display,
    fontSize: "28px",
    fontWeight: "600",
    color: tokens.ink,
    marginBottom: "20px",
  },

  historySearchInput: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    border: `1px solid ${tokens.border}`,
    fontSize: "14px",
    marginBottom: "20px",
    background: tokens.surface,
    outline: "none",
    boxSizing: "border-box",
  },

  historyTableWrap: {
    background: tokens.surface,
    borderRadius: "16px",
    border: `1px solid ${tokens.border}`,
    boxShadow: "0 1px 2px rgba(22,36,31,.03)",
    overflow: "hidden",
  },

  historyTable: {
    width: "100%",
    borderCollapse: "collapse",
  },

  historyTableHeadCell: {
    textAlign: "left",
    padding: "14px 18px",
    fontSize: "11.5px",
    fontWeight: "700",
    color: tokens.muted,
    textTransform: "uppercase",
    letterSpacing: ".05em",
    borderBottom: `1px solid ${tokens.border}`,
    background: tokens.canvas,
  },

  historyTableCell: {
    padding: "14px 18px",
    fontSize: "13.5px",
    color: tokens.ink,
    borderBottom: `1px solid ${tokens.border}`,
  },
};

export const statusPillStyle = (status) => {
  const key = (status || "").toLowerCase();
  const map = {
    taken: { background: tokens.primaryTint, color: tokens.primaryDark, label: "Taken" },
    missed: { background: tokens.coralTint, color: tokens.coral, label: "Missed" },
    pending: { background: tokens.amberTint, color: tokens.amber, label: "Pending" },
  };
  const match = map[key] || map.pending;
  return {
    style: {
      background: match.background,
      color: match.color,
      padding: "4px 12px",
      borderRadius: "999px",
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: ".04em",
      display: "inline-block",
    },
    label: match.label,
  };
};

export default styles;
