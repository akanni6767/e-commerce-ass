import axios from "axios";

const api = axios.create({
    baseURL: 'https://ecommercebackend-8gx8.onrender.com', // Backend URL
    withCredentials: true, // Include cookies in requests
});

export default api;