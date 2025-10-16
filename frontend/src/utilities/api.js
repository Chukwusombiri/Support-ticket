import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: apiBaseUrl, // Adjust the baseURL as needed
    headers: {  
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Add a request interceptor to include credentials if needed   

api.interceptors.request.use(
    config => {
        // You can add authorization headers or other custom headers here if needed
        const token = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).token : null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);

export default api;