import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function CallHistory() {
  const [calls, setCalls] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState({ status: "", direction: "" });

  const load = () => {
    const params = new URLSearchParams();
    if (filter.status) params.set("status", filter.status);
    if (filter.direction) params.set("direction", filter.direction);
    api.get(`/calls?${params}`).then(data => {
      setCalls(data.calls);
      setTotal(data.total);
    }).catch(() => {});
  };

  useEffect(() => { load(); }, [filter.status, filter.direction]);

  const viewDetail = async (id) => {
    setSelected(id);
    const data = await api.get(`/calls/${id}`);
    setDetail(data);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Call History</h1>
        <span style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>{total} calls</span>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <select value={filter.direction} onChange={e => setFilter({ ...filter, direction: e.target.value })}>
          <option value="">All directions</option>
          <option value="inbound">Inbound</option>
          <option value="outbound">Outbound</option>
        </select>
        <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
          <option value="">All statuses</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
          <option value="failed">Failed</option>
          <option value="no_answer">No Answer</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
        <div className="card" style={{ padding: 0, overflow: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Direction</th>
                <th>Status</th>
                <th>From</th>
                <th>To</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {calls.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)" }}>No calls found</td></tr>
              ) : calls.map(c => (
                <tr key={c.id} onClick={() => viewDetail(c.id)} style={{ cursor: "pointer", background: selected === c.id ? "var(--color-primary-50)" : undefined }}>
                  <td><span className={`badge badge-${c.direction === "inbound" ? "success" : "primary"}`}>{c.direction}</span></td>
                  <td><span className={`badge badge-${c.status === "completed" ? "success" : c.status === "failed" ? "error" : "warning"}`}>{c.status}</span></td>
                  <td>{c.from_number || "–"}</td>
                  <td>{c.to_number || "–"}</td>
                  <td>{c.duration_seconds ? `${Math.round(c.duration_seconds)}s` : "–"}</td>
                  <td>{c.created_at ? new Date(c.created_at).toLocaleDateString() : "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && detail && (
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 600 }}>Call Detail</h3>
              <button className="btn btn-secondary" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }} onClick={() => { setSelected(null); setDetail(null); }}>Close</button>
            </div>
            <div style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>
              <p><strong>Direction:</strong> {detail.direction}</p>
              <p><strong>Status:</strong> {detail.status}</p>
              <p><strong>Duration:</strong> {detail.duration_seconds ? `${Math.round(detail.duration_seconds)}s` : "N/A"}</p>
              {detail.sentiment && <p><strong>Sentiment:</strong> {detail.sentiment}</p>}
            </div>
            <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Transcript</h4>
            {detail.transcript?.length > 0 ? (
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {detail.transcript.map((t, i) => (
                  <div key={i} style={{ padding: "0.5rem", borderRadius: "var(--radius-md)", marginBottom: "0.375rem", background: t.speaker === "agent" ? "var(--color-primary-50)" : "var(--color-bg-tertiary)" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", color: "var(--color-text-secondary)" }}>{t.speaker}</div>
                    <div style={{ fontSize: "0.85rem" }}>{t.content}</div>
                  </div>
                ))}
              </div>
            ) : <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>No transcript available</p>}
          </div>
        )}
      </div>
    </div>
  );
}
