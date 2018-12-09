// Export not working, so files temporarily in htmlRoutes.js file
var passport = require("passport");
//var session = require("express-session");
var router = require("express").Router();

require('../config/oAuth'); // this is where our stretegy is....

var authCheck = (req,res,next) =>{
    if(!req.user){
        // if user not logged in
        res.redirect("/");
    }else{
        next();
    }
};

//router.get("/signup", function(req, res) {res.render("signup")});
router.get("/google",passport.authenticate('google', { scope: ['profile'] }));
router.post("/login", passport.authenticate("local",
    {successRedirect:"/home",failureRedirect:"/",failureFlash:true}));
router.get("/logout", (req, res)=> {req.logout(),res.send("you are logged out")});//{req.logout();res.redirect("/")});
router.get("/google/redirect", passport.authenticate('google', { scope: ['profile'] }),(req,res)=>{res.render("home")});
//router.get("/home",authCheck,(req,res)=>{res.redirect("/home")});
module.exports = router;
