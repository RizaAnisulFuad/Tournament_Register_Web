// axiosConfig.ts

import { useAuthStore } from "@/store/auth";
import axios from "axios";

// Creating an instance of Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export interface AxiosErrorResponse {
  data: null;
  message: string;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
