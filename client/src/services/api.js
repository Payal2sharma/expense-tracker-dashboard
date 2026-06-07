import axios from "axios";

const api = axios.create({
  baseURL:
    "https://expense-tracker-dashboard-8z39.onrender.com/",
});

export default api;