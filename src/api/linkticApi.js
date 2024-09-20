import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables.js";
const { API_URL } = getEnvVariables();

const linkticApi = axios.create({
    baseURL: API_URL,
})

export default linkticApi;