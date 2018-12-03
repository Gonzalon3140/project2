var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys")

passport.use(
    new GoogleStrategy({
        // options for the Google Strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
    ()=>{
        // passport callback function
    })
)

