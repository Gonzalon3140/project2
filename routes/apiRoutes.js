var db = require("../models");
var moment = require("moment");
var authentic = require("../views/index.handlebars")

module.exports = function (app) {
  /*---------------PAGE-POPULATOR----------------*/

  //var to find by zipcode
  var location = authentic.location;

  // LOAD HOMEPAGE w/ all your posts and 10 most recent posts in your area
  app.get("/api/95618", function (req, res) {

    // get 10 recent posts in user region
    db.postTable.findAll({ 
      limit: 10, 
      where: {
        zip: 95618//location
      }
    }).then(function (response) {
        console.log(response);
        res.render("home", {
          localPost: response
        });
    });    

    // get all user's posts
    db.postTable.findAll({
      where: {

        zipcode: req.params.zip
      }
    }).then(function (userposts) {
      res.render("home", {
        userfeed: userposts
      });
    });
    // get all recent posts in user region
    db.Posts.findAll({
      where: {
        zipcode: req.params.zip
      } /* && limited by most recent */
    }).then(function (recent) {
      res.render("home", {
        localfeed: recent
      });

    });

  });

  // LOAD CATEGORY page containing all posts
  app.get("/api/:zip/:category", function (req, res) {

    db.PostTable.findAll({
      where: {
        category: req.params.category,
        zipcode: req.params.zip
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
    }).then(function(response) {
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
  app.post("/api/comments", function(req, res) {

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
  app.delete("/api/comments/:id", function(req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id, 
    db.commentTable.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(response) {
      // then return the result using res.json
      res.json(response);
    });
  });
  
  // UPDATE YOUR COMMENT
  app.put("/api/comments", function(req, res) {

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

  });
};

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

*/
