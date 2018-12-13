//var env = require("dotenv").load();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
//var keys = require("./config/keys");
var passport = require("passport");

var app = express();
var PORT = process.env.PORT || 3000;
//var LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());
//var authRoutes = require("./routes/authRoutes");
//var passportSetup = require("./config/oAuth");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
//app.use(require("express-session")({secret:"123454321"}));
//authentication
//app.use("/auth", authRoutes);
//app.use(passport.session());

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  user.findById(id).then((user)=>{
      done(null,user);
  });
});

// passport.use("local", new LocalStrategy(
//   {
//     usernameField:"email",
//     passwordField:"password",
//     passReqtoCallback:true
//   },
//   function(req, email, password, done) {
//     db.userTable.findOne({where:{email:email}}).then (function(err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false, {message:"badness"})}
//       if (user.password != password) { return done(null, false); }
//       return done(null, user);
//     }).catch(function(err){
//       console.log(err);
//     })
// }));

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app,passport);
require("./routes/htmlRoutes")(app);
require("./routes/authRoutes");
require("./config/passport")(passport, db.userTable);

// var syncOptions = {};


// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function () {
  // db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;