import axios from 'axios';

// Use relative path '' so CRA dev proxy forwards /api to backend during development,
// and in production it calls the same origin (backend serving the build)
const API = axios.create({
  baseURL: ''
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
