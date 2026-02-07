import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 404) {
        console.error("Resource not found:", data?.message);
      } else if (status === 400) {
        console.error("Bad request:", data?.message);
      } else if (status === 500) {
        console.error("Server error:", data?.message);
      }
    } else if (error.request) {
      console.error("Network error: No response from server");
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
