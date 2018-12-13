var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require("./keys");
var db = require("../models");
//var User = require("../models/user"); //need to use usertable model

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    user.findById(id).then((user)=>{
        done(null,user);
    });
});

exports.default = passport.use(
    new GoogleStrategy({
        // options for the Google Strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
    (accessToken,refreshToken,profile,done)=>{
        // check if user exists
        db.userTable.findOne({
            where:{gID:profile.id}
        }).then((curUser)=>{
            if(curUser){
                console.log("user found ", curUser);
                done(null,curUser);
            }else{
            db.userTable
                .build({
                    gID: profile.id,
                    name: profile.displayName,
                    thumbnail:profile._json.image.url,
                })
                .save()
                .then( newUser =>  done(null,newUser) )
                .catch(err=> console.log(err));      
            }
        })       
    })
)
