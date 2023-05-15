const mongoose = require("mongoose");

const connectMongoDB = async ({ username, password, host, port, db }) => {
  const URIString =
    username != null && password != null
      ? `mongodb://${username}:${password}@${host}:${port}/${db}`
      : `mongodb://${host}:${port}/${db}`;

  try {
    await mongoose.connect(URIString);
    return { message: "Mongo Connection Successful" };
  } catch (Error) {
    console.log(Error);
    return { message: `Mongo Connection Failed: ${Error}` };
  }
};

module.exports = connectMongoDB;
