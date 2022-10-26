const mongoose = require("mongoose");

const db_url = process.env.MONGODB_URL;

mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  Users: require("./users"),
};
