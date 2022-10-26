const express = require("express");
const app = express();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const session = require("express-session");

require("dotenv").config();
require("./models");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
