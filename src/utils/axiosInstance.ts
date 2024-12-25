// axiosInstance.js
import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/sprintup`,
});

export const eventAxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_EVENT_BASE_URL}`,
});

// Request interceptor to add the JWT token to the Authorization header
eventAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Request interceptor to add the JWT token to the Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
