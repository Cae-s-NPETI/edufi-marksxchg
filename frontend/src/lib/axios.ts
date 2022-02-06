import axios from "axios";

export const tradesSvc = axios.create({
    baseURL: "http://localhost:9165"
});
