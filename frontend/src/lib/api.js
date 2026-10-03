const API_BASE = "/api/v1";

let _token = null;
try { _token = localStorage.getItem("token"); } catch { /* noop */ }

export function setToken(t) {
  _token = t;
  try { if (t) localStorage.setItem("token", t); else localStorage.removeItem("token"); } catch { /* noop */ }
}

export function getToken() { return _token; }

async function request(path, opts = {}) {
  const headers = { ...opts.headers };
  if (_token) headers["Authorization"] = `Bearer ${_token}`;

  if (opts.body && !(opts.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (res.status === 204) return null;
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    const error = new Error(err.detail || "Request failed");
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  del: (path) => request(path, { method: "DELETE" }),
  upload: (path, file, params = {}) => {
    const form = new FormData();
    form.append("file", file);
    Object.entries(params).forEach(([k, v]) => { if (v != null) form.append(k, v); });
    return request(path, { method: "POST", body: form });
  },
  login: async (email, password) => {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || "Login failed");
    }
    return res.json();
  },
};
