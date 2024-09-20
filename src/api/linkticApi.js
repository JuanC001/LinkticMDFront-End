import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables.js";
const { API_URL } = getEnvVariables();

const linkticApi = axios.create({
    baseURL: API_URL,
})

linkticApi.interceptors.request.use((config) => {
    const { token } = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}

    if (token) {
        config.headers['x-token'] = token
    }
    return config
})

export default linkticApi;