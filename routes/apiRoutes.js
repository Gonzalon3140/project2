var db = require("../models");
var moment = require("moment");
var authentic = require("../views/index.handlebars")

module.exports = function (app) {
  /*---------------PAGE-POPULATOR----------------*/

  //var to find by zipcode
  var location = authentic.location;

  // LOAD HOMEPAGE w/ all your posts and 10 most recent posts in your area
  app.get("/api/:zip", function (req, res) {

    // get 10 recent posts in user region
    db.Posts.findAll({ 
      limit: 10, 
      where: {
        zip: location
      }
    }).then(function (recent) {
      for (i = 0; i < recent.length; i++) {
        res.render("home", {
          localPost: recent[i],
          localTitle: recent[i].title,
          localBody: recent[i].body,
          postID: recent[i].id
        });
      }
    });    
    // get all user's posts
    db.Posts.findAll({
      where: {
        zip: location
      }
    }).then(function (userposts) {
      for (i = 0; i < userposts.length; i++) {
        res.render("home", {
          yourPosts: userposts[i],
          yourTitle: userposts[i].title,
          yourBody: userposts[i].title,
          postID: userposts[i].id
        });
      }
    });

  });

  // LOAD CATEGORY page containing all posts
  app.get("/api/:zip/:category", function (req, res) {
    db.Posts.findAll({
      where: {
        category: req.body.category,
        zip: location
      }
    }).then(function (resPosts) {
      res.render("category", {
        category: resPosts
      });
    });
  });

  /*---------------POST-MANAGER------------------*/

  // CREATE A POST
  app.post("/api/posts", function (req, res) {
    // Add sequelize code for creating a post using req.body,

    db.postTable.create({
      title: req.body.newTitle,
      body: req.body.newBody,
      category: req.body.data-id,
      expirationDate: moment().add(3, 'days').calendar() // will change based on category, set to 3 days
    }).then(function (response) {
      // then return the result using res.json
      res.json(response);
    });

  });

  //DELETE ONE OF YOUR POSTS
     app.delete("/api/posts/:id", function (req, res) {
        var id = $(this).data("id");
       // Add sequelize code to delete a post where the id is equal to req.params.id,
       db.postTable
         .destroy({
           where: {
             id: id
           }
         })
         .then(function (response) {
           // then return the result using res.json
           res.json(response);
         });
     });

  // UPDATE YOUR POST
  app.put("/api/posts/update", function (req, res) {
    var id = $(this).data("id");
    // Add code here to update a post using the values in req.body, where the id is equal to
    db.postTable
      .update({
        title: req.body.title,
        body: req.body.body
      }, {
        where: {
          id: id
        }
      })
      .then(function (response) {
        // then return the result using res.json
        res.json(response);
      });
  });

  /*----------------COMMENT-MANAGER-----------------*/

  // CREATE A COMMENT
  app.post("/api/comments", function (req, res) {
    // Add sequelize code for creating a post using req.body,
    db.commentTable
      .create({
        body: req.body.body,
        category: req.body.category
      })
      .then(function (response) {
        // then return the result using res.json
        res.json(response);
      });
  });

  // DELETE ONE OF YOUR COMMENTS
  app.delete("/api/comments/:id", function (req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id, 
    db.commentTable.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (response) {
      // then return the result using res.json
      res.json(response);
    });
  });

  // UPDATE YOUR COMMENT
  app.put("/api/comments", function (req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    db.commentTable
      .update({
        body: req.body.body
      }, {
        where: {
          id: req.body.id
        }
      })
      .then(function (response) {
        // then return the result using res.json
        res.json(response);
      });
  });

  /*-------------USER-MANAGER----------------*/

  // ADD USER ACCOUNT
  app.post("/api/users", function (req, res) {
    // Add sequelize code for creating a post using req.body,

    var pass1 = $("#pass");
    var pass2 = $("#confirm")

    if (pass1 == pass2) {
      console.log("passwords identical");
      db.userTable.create({
        firstName: $("#first"),
        lastName: $("#last"),
        email: $("#email"),
        password: $("#pass"),
        zipcode: $("#zip"),
      }).then(function(response) {
        // then return the result using res.json
        res.json(response);
      });

    } else { 
      console.log("not identical");
      alert("passwords are not identical, please re-enter");
    }

    db.userTable.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, //check KAMRAN'S AUTHENTIFICATION
      zipcode: req.body.zipcode
    }).then(function (response) {
      // then return the result using res.json
      res.json(response);
    });


  });

  // GET USER INFO FOR PROFILE PAGE
  app.get("/api/users", function (req, res) {
    db.Posts.findOne({
      where: {
        id: req.id
      }
    }).then(function (userProfile) {
      res.render("profile", {
        userProfile
      });

    });
  });
}
