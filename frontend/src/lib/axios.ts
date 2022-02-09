import axios from "axios";

export const tradesSvc = axios.create({
    baseURL: "http://" + (import.meta.env["VITE_TRADES_HOST"] ?? "localhost:9165")
});

console.log(import.meta.env["VITE_TRADES_HOST"])
