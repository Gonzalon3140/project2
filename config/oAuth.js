var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require("./keys");
var db = require("../models");
var LocalStrategy = require("passport-local").Strategy;
//var User = require("../models/user"); //need to use usertable model
//var bCrypt = require("bcrypt-nodejs");

passport.serializeUser((user,done)=>{
    console.log("serializing ID",user.id);
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    user.findById(id).then((user)=>{
        console.log("deserializing ID", user.name);
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
                //console.log("user found ", curUser);
                done(null,curUser);
            }else{
            db.userTable
                .build({
                    gID: profile.id,
                    name: profile.displayName,
                    thumbnail:profile._json.image.url,
                })
                .save()
                .then( newUser => done(null,newUser) )
                .catch(err=> console.log(err));      
            }
        })       
    })
);

passport.use(new LocalStrategy(
    function(username, password, done) {
      db.userTable.findOne({ email: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'no account found' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
));