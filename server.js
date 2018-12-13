//var env = require("dotenv").load();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
//var keys = require("./config/keys");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var app = express();
var PORT = process.env.PORT || 3000;
//var LocalStrategy = require("passport-local").Strategy;

//var authRoutes = require("./routes/authRoutes");
//var passportSetup = require("./config/oAuth");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
//app.use(require("express-session")({secret:"123454321"}));
//authentication
//app.use("/auth", authRoutes);
//app.use(passport.session());

// passport.serializeUser((user,done)=>{
//   done(null,user.id);
// });

// passport.deserializeUser((id,done)=>{
//   user.findById(id).then((user)=>{
//       done(null,user);
//   });
// });



// Middleware


// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
require("./config/passport")(passport, db.userTable);
require("./routes/authRoutes")(app,passport);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app,passport);



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