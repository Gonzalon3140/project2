var db = require("../models");

// These are really AUTHORIZATION requirements - should move to authRoutes.js
// var passport = require("passport");
// These are really AUTHORIZATION requirements - should move to authRoutes.js

module.exports = function(app) {
  // Load index/log-in page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load signup page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Load home page
  app.get("/home", function(req, res) {
    res.render("home");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
