import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://folder-structure-api.onrender.com/",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
