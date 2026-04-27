import axios from "axios";

// FORCE LOCAL BACKEND
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
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