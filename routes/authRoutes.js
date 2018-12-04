// Export not working, so files temporarily in htmlRoutes.js file
var passport = require("passport");
var router = require("express").Router();

router.get("/login", function(req, res) {
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/logout", function(req, res) {
  //handle with passport
  res.send("Logging out...");
});

router.get("/google/redirect", function(req, res) {
  res.send("Callback URI reached succesfully");
});

module.exports = router;
