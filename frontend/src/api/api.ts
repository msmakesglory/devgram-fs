// src/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // 🛑 Change this to your backend base URL
    withCredentials: true, // 👈 Important: send cookies with every request
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Optional: Add interceptors (e.g., for error logging or handling 401 redirects)
api.interceptors.response.use(
    response => response,
    error => {
        // Example: Redirect to login on 401
        if (error.response?.status === 401) {
            console.warn('Unauthorized – maybe redirect to login?');
            // window.location.href = '/login'; // if desired
        }
        return Promise.reject(error);
    }
);

export default api;