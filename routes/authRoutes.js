
// var passport = require("passport");
// //var session = require("express-session");
// var router = require("express").Router();
// var db = require("../models");

// require('../config/oAuth.js'); // this is where our stretegy is....


// router.get("/signup", function (req, res) {
//     res.render("signup")
// });
// router.get("/google", passport.authenticate("google", {
//     scope: ["profile"]
// }));
// //router.get("/login", function(req, res) {res.render("login")});
// router.get("/logout", function (req, res) {
//     req.logout();
//     res.redirect("/index")
// });
// router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
//     res.render("home")

// });

// module.exports = router;

var authController = require("../controllers/authController");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);
  app.get("/", authController.signin);
  app.get("/signin", authController.signin);
  app.get("/logout", authController.logout);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home",
      failureRedirect: "/poop"
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/home",
      failureRedirect: "/poop"
    })
  );
};