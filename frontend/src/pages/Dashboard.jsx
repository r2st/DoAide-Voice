import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { api } from "../lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [usage, setUsage] = useState(null);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    api.get("/analytics").then(setStats).catch(() => {});
    api.get("/analytics/usage").then(setUsage).catch(() => {});
    api.get("/agents").then(setAgents).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Calls" value={stats?.total_calls ?? "–"} />
        <StatCard label="Active Agents" value={agents.filter(a => a.status === "active").length} />
        <StatCard label="Minutes Used" value={usage ? `${usage.minutes_used}/${usage.minutes_limit}` : "–"} sub={usage ? `${usage.percent_used}% of free tier` : ""} />
        <StatCard label="Conversion Rate" value={stats ? `${stats.conversion_rate}%` : "–"} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div className="card">
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Sentiment Overview</h3>
          {stats ? (
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div><span className="badge badge-success">Positive</span> {stats.positive_sentiment}</div>
              <div><span className="badge badge-warning">Neutral</span> {stats.neutral_sentiment}</div>
              <div><span className="badge badge-error">Negative</span> {stats.negative_sentiment}</div>
            </div>
          ) : <p style={{ color: "var(--color-text-secondary)" }}>No data yet</p>}
        </div>

        <div className="card">
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Your Agents</h3>
          {agents.length === 0 ? (
            <p style={{ color: "var(--color-text-secondary)" }}>No agents created yet</p>
          ) : (
            <ul style={{ listStyle: "none" }}>
              {agents.slice(0, 5).map(a => (
                <li key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.375rem 0", borderBottom: "1px solid var(--color-border-light)" }}>
                  <span>{a.name}</span>
                  <span className={`badge badge-${a.status === "active" ? "success" : "warning"}`}>{a.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
