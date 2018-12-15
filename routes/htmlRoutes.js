var db = require("../models");
var authController = require("../controllers/authController");
var homeController = require("../controllers/homeController");

module.exports = function(app,passport) {
  
   //LATEST WORKING HOME ROUTE
  app.get("/home", authController.isLoggedIn, function (req, res) {
    var array=[];
    db.postTable.findAll().then(function(posts) {
      for (i = 0; i < posts.length; i++) {
        var stuff= posts[i].dataValues;
        array.push(stuff);
      };
    res.render("home", {stuff:array});
    });
    // db.postTable
    //   .findAll({where:{id:currentID}})
    //   .then(function(userposts){
        
    //     for (i = 0; i < userposts.length; i++) {
    //       var stuff=userposts[i].dataValues;
    //       array2.push(stuff);
          
    //     };
    
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

};
