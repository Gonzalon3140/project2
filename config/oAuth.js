var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var db = require("../models");
//var User = require("../models/user"); //need to use usertable model
//var bCrypt = require("bcrypt-nodejs");

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    user.findById(id).then((user)=>{
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for the Google Strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
    (accessToken,refreshToken,profile,done)=>{
        // check if user exists
        db.user.findOne({
            where:{gID:profile.id}
        }).then((curUser)=>{
            if(curUser){
                console.log("user found ", curUser);
                done(null,curUser);
            }else{
            db.user
                .build({
                    gID: profile.id,
                    name: profile.displayName,
                    thumbnail:profile._json.image.url})
                .save()
                .then((newUser)=>{console.log("new user created", newUser)})
                .catch(err=>{console.log("could not create row")});
            done(null,newUser);
            }
        })       
    })
)


// module.exports = function(passport,user){
//     var User = user;
//     var LocalStrategy = require("passport-local").Strategy;
// };

// passport.use("local-signup", new LocalStrategy(
//     {username:"email",
//     password:"password",
//     passReqToCallback:true},
// ));