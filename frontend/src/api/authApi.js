import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// REGISTER
export const registerUser = (data) =>
    API.post("/api/auth/register", data);

// LOGIN
export const loginUser = (data) =>
    API.post("/api/auth/login", data);

// GET CURRENT USER
export const getCurrentUser = () =>
    API.get("/api/auth/me");

export default API;