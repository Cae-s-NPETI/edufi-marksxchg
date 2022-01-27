export default {
    REDIS_URL: `redis://default:${process.env.REDIS_PASS}@${process.env.REDIS_HOST ?? "localhost:9163"}`
}
