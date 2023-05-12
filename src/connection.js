const { createClient } = require("redis");

const client = createClient({
  url: "rediss://10.169.72.132:6379",
  username: "vilaph1",
  password: "Connect2022#123",
});

client.on("error", (error) => console.log("Redis Client Error", error));

client.on("ready", () =>
  console.log("Client connected to redis and ready to use")
);

client.on("end", () => console.log("Client disconnected from redis"));

process.on("SIGINT", () => {
  client.quit();
});

(async () => await client.connect())();
