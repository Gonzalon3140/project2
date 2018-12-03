const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth");

passport.use(
    new GoogleStrategy({
        // options for the Google Strategy
        
    }),
    ()=>{
        // passport callback function
    })
)

