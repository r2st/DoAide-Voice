import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { api } from "../lib/api";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    api.get("/analytics").then(setStats).catch(() => {});
    api.get("/analytics/usage").then(setUsage).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Calls" value={stats?.total_calls ?? "–"} />
        <StatCard label="Completed" value={stats?.completed_calls ?? "–"} />
        <StatCard label="Avg Duration" value={stats ? `${stats.avg_duration_seconds}s` : "–"} />
        <StatCard label="Total Minutes" value={stats ? `${stats.total_duration_minutes}` : "–"} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Call Direction</h3>
          {stats ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--color-border-light)" }}>
                <span>Inbound</span><strong>{stats.inbound_calls}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
                <span>Outbound</span><strong>{stats.outbound_calls}</strong>
              </div>
            </div>
          ) : <p style={{ color: "var(--color-text-secondary)" }}>Loading...</p>}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Sentiment</h3>
          {stats ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--color-border-light)" }}>
                <span className="badge badge-success">Positive</span><strong>{stats.positive_sentiment}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--color-border-light)" }}>
                <span className="badge badge-warning">Neutral</span><strong>{stats.neutral_sentiment}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
                <span className="badge badge-error">Negative</span><strong>{stats.negative_sentiment}</strong>
              </div>
            </div>
          ) : <p style={{ color: "var(--color-text-secondary)" }}>Loading...</p>}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Conversions</h3>
          {stats ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--color-border-light)" }}>
                <span>Total Conversions</span><strong>{stats.conversions}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
                <span>Conversion Rate</span><strong>{stats.conversion_rate}%</strong>
              </div>
            </div>
          ) : <p style={{ color: "var(--color-text-secondary)" }}>Loading...</p>}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Usage This Month</h3>
          {usage ? (
            <div>
              <div style={{ marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.375rem" }}>
                  <span>{usage.minutes_used} / {usage.minutes_limit} min</span>
                  <span>{usage.percent_used}%</span>
                </div>
                <div style={{ height: "8px", background: "var(--color-bg-tertiary)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(usage.percent_used, 100)}%`, background: usage.percent_used > 80 ? "var(--color-warning)" : "var(--color-primary)", borderRadius: "4px", transition: "width 0.3s" }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--color-border-light)" }}>
                <span>Calls Made</span><strong>{usage.calls_made}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
                <span>Calls Received</span><strong>{usage.calls_received}</strong>
              </div>
            </div>
          ) : <p style={{ color: "var(--color-text-secondary)" }}>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
