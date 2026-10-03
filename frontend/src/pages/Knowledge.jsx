import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";

export default function Knowledge() {
  const [docs, setDocs] = useState([]);
  const [agents, setAgents] = useState([]);
  const [agentFilter, setAgentFilter] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const load = () => {
    const params = agentFilter ? `?agent_id=${agentFilter}` : "";
    api.get(`/knowledge${params}`).then(setDocs).catch(() => {});
    api.get("/agents").then(setAgents).catch(() => {});
  };
  useEffect(() => { load(); }, [agentFilter]);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await api.upload("/knowledge", file, agentFilter ? { agent_id: agentFilter } : {});
      fileRef.current.value = "";
      load();
    } catch { /* noop */ }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    await api.del(`/knowledge/${id}`);
    load();
  };

  const formatSize = (bytes) => {
    if (!bytes) return "–";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Knowledge Base</h1>
      </div>

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Upload Document</h3>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "end", flexWrap: "wrap" }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Agent (optional)</label>
            <select value={agentFilter} onChange={e => setAgentFilter(e.target.value)}>
              <option value="">All agents</option>
              {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <input type="file" ref={fileRef} style={{ fontSize: "0.875rem" }} />
          <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {docs.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>No documents yet</p>
          <p>Upload reference documents to enhance your agents&apos; knowledge.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 500 }}>{d.title}</td>
                  <td>{d.mime_type}</td>
                  <td>{formatSize(d.file_size)}</td>
                  <td>{d.created_at ? new Date(d.created_at).toLocaleDateString() : "–"}</td>
                  <td>
                    <button className="btn btn-danger" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }} onClick={() => handleDelete(d.id)}>Delete</button>
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
