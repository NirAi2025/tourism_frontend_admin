import axios from "axios";
import { getToken } from "../utils/token";



const axiosInstance = axios.create({
  baseURL: "http://54.175.243.72:3000/api/", 
  timeout: 15000,
});

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();


    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;