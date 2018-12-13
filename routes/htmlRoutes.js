var db = require("../models");
var authController = require("../controllers/authController");
var homController = require("../controllers/homController");
module.exports = function(app) {
  // Load index/log-in page
  // app.get("/", function(req, res) {
  //   res.render("index");
  // });

  // Load signup page
  // app.get("/auth/signup", function(req, res) {
  //   res.render("signup");
  // });

  // Load home page
  //app.get("/home", authController.isLoggedIn, homController.getHomePage);
  //app.get("/posts/:zip", authController.isLoggedin, homController.getZipPost);
  // Load category page - Kyle
  /*app.get("/category", function(req, res) {
    res.render("category");
  });*/

  
  //  LATEST WORKING HOME ROUTE
  app.get("/home/:zip", authController.isLoggedIn, function (req, res) {
    // get all user's posts
    var currentzip = req.params.zip;
    db.postTable.findAll().then(function (userposts) {
      //console.log(userposts);
      //var stuff = [{title:"",category:"",body:"",zip:""}];
      for (i = 0; i < userposts.length; i++) {
        var stuff=userposts[i].dataValues;
        stuff.push(stuff);
      }
      // var stuff={
      //   title: "yo",
      //   body: "right here"
      // }
      console.log(stuff);
      res.render("home", {
        stuff: stuff
      });
    });
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
