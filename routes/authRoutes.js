// Export not working, so files temporarily in htmlRoutes.js file
var passport = require("passport");
//var session = require("express-session");
var router = require("express").Router();

<<<<<<< HEAD
router.get("/signup", function(req, res) {res.render("signup")});
router.get("/google",passport.authenticate("google",{scope:["profile"]}));
//router.get("/login", function(req, res) {res.render("login")});
router.get("/logout", function(req, res) {req.logout();res.redirect("/index")});
router.get("/google/redirect", passport.authenticate("google"),(req,res)=>{res.render("home")});
=======
router.get("/signup", function(req, res) {
  res.render("signup");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/logout", function(req, res) {
  //handle with passport
  res.send("Logging out...");
});

router.get("/google/redirect", function(req, res) {
  res.send("Callback URI reached succesfully");
});
>>>>>>> 34af0abb16b219a656e1dba6724baa2353ae8bf0

module.exports = router;
