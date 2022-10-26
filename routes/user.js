const route = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

route.get("/", (req, res) => {
  res.send("Welcome to the signup API");
});

// signup route
route.post("/create-user", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 15),
    uniqueId: uuidv4(),
  });
  newUser.save((err, user) => {
    try {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(user);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

// login route using passport
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        // if no user is found
        if (!user) {
          return done("Incorrect email/User does not exists", false, {
            message: "Incorrect email/User does not exists",
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done("Incorrect password", false, {
            message: "Incorrect password",
          });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

route.get("/login", (req, res) => {
  res.send(req.session);
});

route.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failWithError: true,
  }),
  (req, res) => {
    res.status(200).send(req.user);
  }
);

route.post("/logout", (req, res) => {
  req.logout();
  res.status(200).send("logged out");
});

module.exports = route;
