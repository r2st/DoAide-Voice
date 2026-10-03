import { useEffect, useState } from "react";
import { api } from "../lib/api";

const EMPTY = { name: "", personality: "", script: "", greeting: "", voice_type: "female", language: "en" };

export default function AgentBuilder() {
  const [agents, setAgents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const load = () => api.get("/agents").then(setAgents).catch(() => {});
  useEffect(() => { load(); }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const startCreate = () => { setEditing("new"); setForm(EMPTY); setError(""); };
  const startEdit = (agent) => { setEditing(agent.id); setForm(agent); setError(""); };
  const cancel = () => { setEditing(null); setForm(EMPTY); setError(""); };

  const save = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editing === "new") {
        await api.post("/agents", form);
      } else {
        await api.patch(`/agents/${editing}`, form);
      }
      cancel();
      load();
    } catch (err) { setError(err.message); }
  };

  const remove = async (id) => {
    await api.del(`/agents/${id}`);
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Voice Agents</h1>
        {!editing && <button className="btn btn-primary" onClick={startCreate}>+ New Agent</button>}
      </div>

      {editing && (
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem", fontWeight: 600 }}>
            {editing === "new" ? "Create Agent" : "Edit Agent"}
          </h3>
          {error && <div style={{ padding: "0.5rem", background: "var(--color-error-bg)", color: "var(--color-error)", borderRadius: "var(--radius-md)", marginBottom: "1rem", fontSize: "0.875rem" }}>{error}</div>}
          <form onSubmit={save}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Name</label>
                <input value={form.name} onChange={set("name")} required />
              </div>
              <div className="form-group">
                <label>Voice Type</label>
                <select value={form.voice_type} onChange={set("voice_type")}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>
              <div className="form-group">
                <label>Language</label>
                <input value={form.language} onChange={set("language")} placeholder="en" />
              </div>
              <div className="form-group">
                <label>Greeting</label>
                <input value={form.greeting || ""} onChange={set("greeting")} placeholder="Hello! How can I help?" />
              </div>
            </div>
            <div className="form-group">
              <label>Personality</label>
              <textarea value={form.personality || ""} onChange={set("personality")} rows={2} placeholder="Friendly and professional" />
            </div>
            <div className="form-group">
              <label>Script / Instructions</label>
              <textarea value={form.script || ""} onChange={set("script")} rows={3} placeholder="Instructions for the AI agent..." />
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={cancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {agents.length === 0 && !editing ? (
        <div className="empty-state">
          <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>No agents yet</p>
          <p>Create your first AI voice agent to get started.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Voice</th>
                <th>Status</th>
                <th>Language</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 500 }}>{a.name}</td>
                  <td>{a.voice_type}</td>
                  <td><span className={`badge badge-${a.status === "active" ? "success" : a.status === "paused" ? "warning" : "primary"}`}>{a.status}</span></td>
                  <td>{a.language}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", marginRight: "0.5rem" }} onClick={() => startEdit(a)}>Edit</button>
                    <button className="btn btn-danger" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }} onClick={() => remove(a.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
