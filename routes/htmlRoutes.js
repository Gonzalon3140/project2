var db = require("../models");
var authController = require("../controllers/authController");
var homeController = require("../controllers/homeController");

module.exports = function(app,passport) {
  
   //LATEST WORKING HOME ROUTE
  app.get("/home", authController.isLoggedIn, function (req, res) {
    // get all user's posts
    var currentzip = req.user.zip;
    var currentID = req.user.id;
    var array2=[];var array=[];
    db.postTable.findAll().then(function (posts) {
      
      //console.log(userposts);
      for (i = 0; i < posts.length; i++) {
        var stuff=posts[i].dataValues;
        array.push(stuff);
        
      };
    });  
    db.postTable
      .findAll({where:{id:currentID}})
      .then(function(userposts){
        
        for (i = 0; i < userposts.length; i++) {
          var stuff=userposts[i].dataValues;
          array2.push(stuff);
          
        };
    })
    res.render("home", {stuff:array2});
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
