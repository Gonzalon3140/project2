// Export not working, so files temporarily in htmlRoutes.js file
var passport = require("passport");
//var session = require("express-session");
var router = require("express").Router();
var db = require("../models");

require('../config/oAuth.js'); // this is where our stretegy is....

router.get("/signup", function(req, res) {res.render("signup")});
router.get("/google",passport.authenticate('google', { scope: ['profile'] }));
//router.get("/login", function(req, res) {res.render("login")});
router.get("/logout", function(req, res) {req.logout();res.redirect("/")});
router.get("/google/redirect", passport.authenticate('google', { scope: ['profile'] }),(req,res)=>{res.redirect("/home")});

//LOG-IN, checks that password and email are correct before going to "/home"
router.get("/login", function(req, res) {
    var email = req.body.logUser;
    var password = req.body.logPass;
    db.userTable.findOne({
        where: { email: email }
        }).then(function (response) {
            console.log(response);
            if (response.password == password) {
                res.redirect("/home");
            } else {
                console.log("email and password don't match");
                alert("Login failed. Email or Password are incorrect.");
            }
        });    
});

module.exports = router;
