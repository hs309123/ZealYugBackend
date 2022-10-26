const route = require("express").Router();

const { Users } = require("../models");

route.get("/", (req, res) => {
  if (req.session.passport) {
    Users.findOne({
      where: {
        id: req.session.passport.user,
      },
    })
      .then((user) => {
        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          uniqueId: user.uniqueId,
        };
        return res.send(userData);
      })
      .catch((err) => {
        return res.send(err);
      });
  } else {
    return res.send("You are not logged in");
  }
});

module.exports = route;
