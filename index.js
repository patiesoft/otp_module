const express = require("express");
app = express();
require("./src/connection");

app.listen(3001, () => {
  console.log("Listening at port 3001");
});
