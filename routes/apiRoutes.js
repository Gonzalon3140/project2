var db = require("../models");
var moment = require("moment");
var authentic = require("../views/index.handlebars")

module.exports = function(app) {
  /*---------------PAGE-POPULATOR----------------*/

  //var to find by zipcode
  //var location = authentic.location;

  // LOAD HOMEPAGE w/ all your posts and 10 most recent posts in your area
/*  app.get("/home/:zip/:user", function (req, res) {
    //handlebars tag to track user and zip
      var storeZip = req.params.zip;
      var storeUser = req.params.user;
    // get all user's posts
      db.postTable.findAll({ //postTable
        where: {
          zipcode: req.params.zip,
          username: req.params.user
        }
      }).then(function (response) {
        var userposts = response[0].dataValues;
        res.render("home", { userfeed: userposts });
      });
    // get all recent posts in user region
      db.postTable.findAll({
        where: {
          zipcode: req.params.zip,
          limit: 10
        }
      }).then(function (response) {
        var recent = response[0].dataValues;
        res.render("home", {
          localfeed: recent
        });
      });
  });


  // LOAD CATEGORY page containing all posts
    app.get("/api/:zip/:category", function (req, res) {
      db.PostTable.findAll({
        where: {
          category: req.params.category,/*UNKOWN //-->HOW DO I GET THE CATEGORY FROM THE DROP-DOWN MENU SELECTION? IF OPTION HAS AN ID, HOW DO I SELECT THE ACTIVATED ID?
          zipcode: req.body.storeZip
        }
      }).then(function (response) {
        var catPosts = response[0].dataValues;
        res.render("category", {
          category: catPosts
        });
      });
    });*/


//   /*---------------POST-MANAGER------------------*/

//   // CREATE A POST
//     app.post("/api/posts", function (req, res) {
//    //these vars change set the expirationDate by category
//
//    // Add sequelize code for creating a post using req.body,
//     db.postTable.create({
//       title: req.body.newTitle,
//       body: req.body.newBody,
//       category: req.body.data-id, 
//       expirationDate: moment().add(3, 'days').calendar() // will change based on category, set to 3 days
//     }).then(function(response) {
//       var postGen = response.postTable[0].dataValues;
//       // then return the result using res.json
//       res.json(postGen);
//     });

//   });

//   //DELETE ONE OF YOUR POSTS
//      app.delete("/api/posts/:id", function (req, res) {
//        // Add sequelize code to delete a post where the id is equal to req.params.id,
//        db.postTable
//          .destroy({
//            where: {
//              id = req.body.post.postID //--> select an "id" modal from "post" post display --> is this how it works? 
//            }
//          })
//          .then(function (response) {
//            var postDel = response.postTable[0].dataValues;
//            // then return the result using res.json
//            res.json(postDel);
//          });
//      });

//   // UPDATE YOUR POST
//   app.put("/api/posts/update", function (req, res) {
//     // Add code here to update a post using the values in req.body, where the id is equal to
//     db.postTable
//       .update({
//         title: req.body.title,
//         body: req.body.body
//       }, {
//         where: {
//          id = req.body.post.postID //--> select an "id" modal from "post" post display --> is this how it works? 
//        }
//       })
//       .then(function (response) {
//         var postUp = response.postTable[0].dataValues;
//         // then return the result using res.json
//         res.json(postUp);
//       });
//   });

//   /*----------------COMMENT-MANAGER-----------------*/


//   // CREATE A COMMENT
//   app.post("/api/comments", function(req, res) {

//     // Add sequelize code for creating a post using req.body,
//     db.commentTable
//       .create({
//         body: req.body.body,
//         category: req.body.category
//       })
//       .then(function (response) {
//         var commGen = response.commentTable[0].dataValues; 
//         // then return the result using res.json
//         res.json(response);
//       });
//   });

  
//   // DELETE ONE OF YOUR COMMENTS
//   app.delete("/api/comments/:id", function(req, res) {
//     // Add sequelize code to delete a post where the id is equal to req.params.id, 
//     db.commentTable.destroy({
//       where: {
//         id: req.body.comm.id //--> select an "id" modal from "comm" comment display --> is this how it works?
//       }
//     }).then(function(response) {
//        var commDel = response.commentTable[0].dataValues; 
//        console.log("comment" commDel.body);
//       // then return the result using res.json
//       res.json(commDel);
//     });
//   });
  
//   // UPDATE YOUR COMMENT
//   app.put("/api/comments", function(req, res) {

//     // Add code here to update a post using the values in req.body, where the id is equal to
//     db.commentTable
//       .update({
//         body: req.body.body
//       }, {
//         where: {
//           id: req.body.comm.id //--> select an "id" modal from "comm" comment display --> is this how it works?
//         }
//       })
//       .then(function (response) {
//         // then return the result using res.json
//         var commUp = response.commentTable[0].dataValues; 
//         res.json(commUp);
//       });
//   });

//   /*-------------USER-MANAGER----------------*/

     // ADD USER ACCOUNT
     app.post("/api/users", function (req, res) {
       // Add sequelize code for creating a post using req.body,
       var pass1 = $("#pass");
       var pass2 = $("#confirm");

       if (pass1 == pass2) {
         console.log("passwords identical");
         db.userTable.create({
          username: $("#user"),
          firstName: $("#first"),
          lastName: $("#last"),
          email: req.body.email,
          password: $("#pass"),
          zipcode: $("#zip")
         }).then(function(response) {
          // log success
           console.log("account activated");
          // then return the result using res.json
           var newAccount = response[0].dataValues;
           res.json(newAccount);
          //inform user of success
           alert("Your account is succesfully added");
          //return to login page
           res.render("/home");
         });
       } else { 
         console.log("passwords not identical");
         alert("passwords are not identical, please re-enter");
       }
     });
}; //END OF MODULE.EXPORTS


/* UNUSED CODE -- UNUSED CODE -- UNUSED CODE -- UNUSED CODE -- UNUSED CODE -- UNUSED CODE -- */
/*
module.exports = function(app) {
  // Get all examples
  app.get("/api/examples ", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};

  app.get("/api/:zipcode/:id", function (req, res) {
    // get 10 recent posts in user region
    db.postTable.findAll({
      where: {
        category: "for sale"
      }
    }).then(function (response) {
        var tableObject = response.postTable[0].dataValues; //or is it JUST postTable.dataValues?
        console.log("loaded users with that zip");
        console.log(response);
        res.render("home", {userfeed: tableObject});
    });    
  });

*/
