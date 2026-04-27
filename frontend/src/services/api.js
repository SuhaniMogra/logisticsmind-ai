import axios from "axios";

const API_BASE =
  window.location.hostname.includes("railway.app")
    ? window.location.origin
    : "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
});

// Research Agent
export const researchQuery = async (query) => {
  const response = await api.post("/research", null, {
    params: { query },
  });
  return response.data;
};

// Document Upload
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload-doc", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Document Q&A
export const askDocument = async (question) => {
  const response = await api.post("/ask-doc", null, {
    params: { question },
  });

  return response.data;
};

export default api;