import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/'

export const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer"
    },
    mode: 'no-cors'
})