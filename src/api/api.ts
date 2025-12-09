import axios from "axios";
import { queryClient } from "../main";

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})

//set bearer token
api.interceptors.request.use((config) => {
    const token = queryClient.getQueryData(['auth']);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;