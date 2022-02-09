import axios from "axios";

export const tradesSvc = axios.create({
    baseURL: "http://" + process.env.TRADES_HOST
});
