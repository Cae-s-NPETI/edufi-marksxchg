export default {
    REDIS_URL: `redis://default:${process.env.REDIS_PASS}@${process.env.REDIS_HOST ?? "localhost:9163"}`,
    MYSQL_HOST: process.env.MYSQL_HOST ?? "localhost",
    MYSQL_PORT: process.env.MYSQL_HOST ? 3306 : 9161,
    MYSQL_PASS: process.env.MYSQL_PASS,
}
