const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_DB_URL } = process.env;

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("ERROR", err);
});
db.once("open", () => {
  console.log("mongoose is connected");
});

mongoose.connect(MONGO_DB_URL);
