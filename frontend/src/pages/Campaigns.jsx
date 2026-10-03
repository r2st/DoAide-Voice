import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [agents, setAgents] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", agent_id: "", description: "" });
  const [selected, setSelected] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [contactForm, setContactForm] = useState({ name: "", phone_number: "", email: "" });
  const [error, setError] = useState("");

  const load = () => {
    api.get("/campaigns").then(setCampaigns).catch(() => {});
    api.get("/agents").then(setAgents).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const loadContacts = (id) => {
    setSelected(id);
    api.get(`/campaigns/${id}/contacts`).then(setContacts).catch(() => {});
  };

  const createCampaign = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/campaigns", { ...form, agent_id: parseInt(form.agent_id) });
      setCreating(false);
      setForm({ name: "", agent_id: "", description: "" });
      load();
    } catch (err) { setError(err.message); }
  };

  const addContact = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/campaigns/${selected}/contacts`, contactForm);
      setContactForm({ name: "", phone_number: "", email: "" });
      loadContacts(selected);
    } catch { /* noop */ }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Campaigns</h1>
        {!creating && <button className="btn btn-primary" onClick={() => setCreating(true)}>+ New Campaign</button>}
      </div>

      {creating && (
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem", fontWeight: 600 }}>Create Campaign</h3>
          {error && <div style={{ padding: "0.5rem", background: "var(--color-error-bg)", color: "var(--color-error)", borderRadius: "var(--radius-md)", marginBottom: "1rem", fontSize: "0.875rem" }}>{error}</div>}
          <form onSubmit={createCampaign}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Campaign Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Agent</label>
                <select value={form.agent_id} onChange={e => setForm({ ...form, agent_id: e.target.value })} required>
                  <option value="">Select agent...</option>
                  {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} />
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button type="submit" className="btn btn-primary">Create</button>
              <button type="button" className="btn btn-secondary" onClick={() => setCreating(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
        <div>
          {campaigns.length === 0 ? (
            <div className="empty-state">No campaigns yet</div>
          ) : campaigns.map(c => (
            <div key={c.id} className="card" style={{ marginBottom: "0.75rem", cursor: "pointer", border: selected === c.id ? "2px solid var(--color-primary)" : undefined }} onClick={() => loadContacts(c.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: 600 }}>{c.name}</h3>
                <span className={`badge badge-${c.status === "active" ? "success" : c.status === "completed" ? "primary" : "warning"}`}>{c.status}</span>
              </div>
              {c.description && <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>{c.description}</p>}
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-tertiary)", marginTop: "0.5rem" }}>
                {c.total_contacts} contacts
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Contacts</h3>
            <form onSubmit={addContact} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <input placeholder="Name" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} required style={{ flex: 1, minWidth: "120px" }} />
              <input placeholder="Phone" value={contactForm.phone_number} onChange={e => setContactForm({ ...contactForm, phone_number: e.target.value })} required style={{ flex: 1, minWidth: "120px" }} />
              <input placeholder="Email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} style={{ flex: 1, minWidth: "120px" }} />
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
            {contacts.length === 0 ? (
              <p style={{ color: "var(--color-text-secondary)" }}>No contacts added</p>
            ) : (
              <div style={{ overflow: "auto" }}>
                <table>
                  <thead><tr><th>Name</th><th>Phone</th><th>Status</th></tr></thead>
                  <tbody>
                    {contacts.map(ct => (
                      <tr key={ct.id}>
                        <td>{ct.name}</td>
                        <td>{ct.phone_number}</td>
                        <td><span className={`badge badge-${ct.status === "answered" ? "success" : ct.status === "failed" ? "error" : "warning"}`}>{ct.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
