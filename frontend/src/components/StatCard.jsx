export default function StatCard({ label, value, sub }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </div>
      <div style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0" }}>{value}</div>
      {sub && <div style={{ fontSize: "0.8rem", color: "var(--color-text-tertiary)" }}>{sub}</div>}
    </div>
  );
}
