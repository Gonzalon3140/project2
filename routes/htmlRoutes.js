var db = require("../models");
//var router = require("express").Router;

// var authCheck = (req,res,next) =>{
//   if(!req.user){
//       // if user not logged in
//       res.redirect("/");
//   }else{
//       next();
//   }
// };

module.exports = function(app) {
  // Load index/log-in page
  app.get("/", function(req, res) {
    res.render("index");
  });

  //Load signup page
  app.get("/auth/signup", function(req, res) {
    res.render("signup");
  });

  //Load home page
  app.get("/home", function(req, res) {
    res.render("home");
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
