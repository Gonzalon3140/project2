var db = require("../models");
var moment = require("moment");
var authentic = require("../views/index.handlebars")
var passport = require("passport");


module.exports = function (app) {
  var currentZip;
  var currentID;
  
  /*---------------PAGE-POPULATOR----------------*/



  // LOAD HOMEPAGE w/ all your posts and 10 most recent posts in your area
  // app.get("/api/user/:id", function (req, res) {
  app.get("/api/95618", function (req, res) {
    // get all user's posts
    // currentzip = req.params.zip;
    db.userTable
      .findAll({
        where: {id: "1"}
      })
      .then(function (userposts) {
        // console.log(userposts);
        var result = {
          userfeed: userposts[0].dataValues
        };
        console.log(result);
        res.render("home", result);
      });
    // get all recent posts in user region
    // db.postTable
    //   .findAll({
    //     where: {
    //       zipcode: req.params.zip
    //     } /* && limited by most recent */
    //   })
    // .then(function (recent) {
    //   res.render("home", {
    //     localfeed: recent
    //   });
    // });
  });


  app.post("/api/users", function (req, res) {
    db.userTable
      .create({
        name: req.body.name,
        email: req.body.email,
        zipcode: req.body.zipcode,
        password: req.body.password
      })
      .then(function (response) {

        // var result = response[0].dataValues

        res.redirect("/home")
        console.log(response);
        // res.render("home", result);
      });
  });

  app.post("/api/posts", function (req, res) {
    console.log(req);
    db.postTable
      .create({
        title: req.body.name,
        body: req.body.email,
        category: req.body.zipcode,
        expired:false,
        expirationDate:moment.now()
      })
      .then(function (response) {
        // var result = response[0].dataValues
        res.redirect("/home");
        console.log(response);
        // res.render("home", result);
      });
  });

  app.post("/api/login", passport.authenticate("local-signin",{ successRedirect:"/home", failureRedirect:"/"}));

  // app.post("/api/login", function (req, res) {
  //   console.log(req.body.email, req.body.password);
  //   db.userTable.findAll({
  //       where: {email:req.body.email,password:req.body.password}
  //     })
  //     .then(function (response) {
  //       console.log("user found");
  //       var email=response.email;
  //       currentZip = response.zipcode;
  //       currentID = response.id;
  //       if (!email) {
  //         console.log(response);
  //         res.redirect("/auth/signup");
  //       } else {
  //         res.redirect("/home")
  //       }
  //     })
  // });

  // app.get("/home", function (req, res) {

  //   // get all user's posts
  //   // currentzip = req.params.zip;
  //   console.log("routed to home");
  //   db.postTable
  //     .findAll()
  //     .then(function (userposts) {
  //       //console.log(userposts);
  //       var stuff=[];
  //       for (i=0;i<userposts.length;i++){
  //         stuff.push(userposts[i].dataValues)
  //       }
  //       // var stuff={
  //       //   title: "yo",
  //       //   body: "right here"
  //       // }
  //       console.log(stuff);
  //       res.render("home", stuff);
  //     });


  // });


  // UPDATE YOUR POST
  app.put("/api/posts", function (req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    db.postTable
      .update({
        title: req.body.title,
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






};