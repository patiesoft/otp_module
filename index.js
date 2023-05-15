const express = require("express");
app = express();
const cors = require("cors");
const { OTPs } = require("./src/routes");
require("./src/smpp/connection");

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use("/api", OTPs);

app.use("/test", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(3001, () => {
  console.log("Listening at port 3001");
});
