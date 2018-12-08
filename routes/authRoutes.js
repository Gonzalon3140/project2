// Export not working, so files temporarily in htmlRoutes.js file
var passport = require("passport");
//var session = require("express-session");
var router = require("express").Router();

require('../config/oAuth.js'); // this is where our stretegy is....

router.get("/signup", function(req, res) {res.render("signup")});
router.get("/google",passport.authenticate('google', { scope: ['profile'] }));
//router.get("/login", function(req, res) {res.render("login")});
router.get("/logout", function(req, res) {req.logout();res.redirect("/index")});
router.get("/google/redirect", passport.authenticate('google', { scope: ['profile'] }),(req,res)=>{res.render("home")});

module.exports = router;
