var authController = require("../controllers/authController");

module.exports = function(app, passport) {
  
  app.get("/signup", authController.signup);
  app.get("/", authController.signin);

  app.get("/signin", authController.signin);
  
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

  app.get("/logout", authController.logout);

};

