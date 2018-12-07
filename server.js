var env = require("dotenv").load();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var keys = require("./config/keys");
var passport=require("passport");

var app = express();
var PORT = process.env.PORT || 3000;

//authentication
var authRoutes = require("./routes/authRoutes");
//var passportSetup = require("./config/oAuth");
app.use("/auth", authRoutes);
var cookieSession = require("cookie-session");
app.use(cookieSession({maxAge:24*60*60*1000,keys:[keys.session.cookieKey]}));
app.use(passport.initialize());
app.use(passport.session());
// var session = require("express-session");
// app.use(session({secret:"123454321",resave:true,saveUninitialized:true}));
// app.use(passport.initialize());
// app.use(passport.session());

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {force: true};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
