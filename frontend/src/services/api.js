import axios from "axios";

const API_BASE =
  window.location.hostname.includes("railway.app")
    ? window.location.origin
    : "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
});

export default api;