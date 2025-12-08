import axios from "axios";
import { queryClient } from "../main";

const api = axios.create({
    baseURL: 'http://47.130.28.216/ums'
})

//set bearer token
api.interceptors.request.use((config) => {
    const token = queryClient.getQueryData(['auth']);
    console.log('token in api',token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;