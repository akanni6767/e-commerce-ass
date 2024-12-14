import axios from "axios";

const api = axios.create({
    baseURL: '/api', // Backend URL
    withCredentials: true, // Include cookies in requests
});

export default api;