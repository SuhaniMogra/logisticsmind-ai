import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const researchQuery = (query) =>
  API.post(`/research?query=${encodeURIComponent(query)}`);

export const uploadDocument = (formData) =>
  API.post("/upload-doc", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const askDocument = (question) =>
  API.post(`/ask-doc?question=${encodeURIComponent(question)}`);