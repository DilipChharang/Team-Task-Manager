import axios from "axios";

const API = axios.create({
  baseURL: "team-task-manager-production-3518.up.railway.app",
});

// token automatically add karega
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;