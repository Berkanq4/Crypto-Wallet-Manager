const Redis = process.env.NODE_ENV === "test" ? require("ioredis-mock") : require("ioredis");
const redisClient = new Redis();

redisClient.on("connect", () => console.log("Connected to Redis successfully!"));
redisClient.on("error", (err) => console.error("Redis connection error:", err));

module.exports = redisClient;