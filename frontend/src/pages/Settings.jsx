import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../lib/api";

export default function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ full_name: "", business_name: "", industry: "" });
  const [twilio, setTwilio] = useState({ twilio_account_sid: "", twilio_auth_token: "", twilio_phone_number: "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [twilioMsg, setTwilioMsg] = useState("");

  useEffect(() => {
    if (user) {
      setProfile({ full_name: user.full_name || "", business_name: user.business?.name || "", industry: user.business?.industry || "" });
    }
    api.get("/settings/twilio").then(data => {
      setTwilio({
        twilio_account_sid: data.twilio_account_sid || "",
        twilio_auth_token: data.twilio_auth_token || "",
        twilio_phone_number: data.twilio_phone_number || "",
      });
    }).catch(() => {});
  }, [user]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    try {
      await api.patch("/settings/profile", profile);
      setProfileMsg("Profile updated");
    } catch (err) { setProfileMsg(err.message); }
  };

  const saveTwilio = async (e) => {
    e.preventDefault();
    setTwilioMsg("");
    try {
      await api.put("/settings/twilio", twilio);
      setTwilioMsg("Twilio settings saved");
    } catch (err) { setTwilioMsg(err.message); }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div style={{ display: "grid", gap: "1.5rem", maxWidth: "640px" }}>
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Profile</h3>
          {profileMsg && <div style={{ padding: "0.5rem", background: "var(--color-success-bg)", color: "var(--color-success)", borderRadius: "var(--radius-md)", marginBottom: "1rem", fontSize: "0.875rem" }}>{profileMsg}</div>}
          <form onSubmit={saveProfile}>
            <div className="form-group">
              <label>Full Name</label>
              <input value={profile.full_name} onChange={e => setProfile({ ...profile, full_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Business Name</label>
              <input value={profile.business_name} onChange={e => setProfile({ ...profile, business_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <input value={profile.industry} onChange={e => setProfile({ ...profile, industry: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Twilio Configuration</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            Connect your Twilio account to enable voice calls.
          </p>
          {twilioMsg && <div style={{ padding: "0.5rem", background: "var(--color-success-bg)", color: "var(--color-success)", borderRadius: "var(--radius-md)", marginBottom: "1rem", fontSize: "0.875rem" }}>{twilioMsg}</div>}
          <form onSubmit={saveTwilio}>
            <div className="form-group">
              <label>Account SID</label>
              <input value={twilio.twilio_account_sid} onChange={e => setTwilio({ ...twilio, twilio_account_sid: e.target.value })} placeholder="ACxxxxxx" />
            </div>
            <div className="form-group">
              <label>Auth Token</label>
              <input type="password" value={twilio.twilio_auth_token} onChange={e => setTwilio({ ...twilio, twilio_auth_token: e.target.value })} placeholder="Enter auth token" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input value={twilio.twilio_phone_number} onChange={e => setTwilio({ ...twilio, twilio_phone_number: e.target.value })} placeholder="+1234567890" />
            </div>
            <button type="submit" className="btn btn-primary">Save Twilio Settings</button>
          </form>
        </div>
      </div>
    </div>
  );
}
