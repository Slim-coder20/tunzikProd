const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw Object.assign(new Error(data.message || "Erreur API"), {
        status: res.status,
        data,
      });
    }
    return data;
  },
};
