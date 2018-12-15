//var env = require("dotenv").load();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var keys = require("./config/keys");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({ secret: keys.session.cookieKey, resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
require("./config/passport")(passport, db.userTable);
require("./routes/authRoutes")(app,passport);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app,passport);

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