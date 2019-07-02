var db = require("../models");
var moment = require("moment");
var authentic = require("../views/index.handlebars")
var passport = require("passport");


module.exports = function (app) {
  var currentZip;
  var currentID;

  /*---------------PAGE-POPULATOR----------------*/


  app.post("/api/users", function (req, res) {
    db.userTable
      .create({
        name: req.body.name,
        email: req.body.email,
        zip: req.body.zip,
        password: req.body.password
      })
      .then(function (response) {

        // var result = response[0].dataValues

        res.redirect("/home")
        console.log(response);
        // res.render("home", result);
      });
  });

  app.post("/api/post", function (req, res) {
    console.log(req);
    db.postTable
      .create({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        expired: false,
        expirationDate: moment().add(7, "d")
      })
      .then(function (response) {
        // var result = response[0].dataValues
        res.redirect("/home");
        // res.render("home", result);
      });
  });

  // UPDATE YOUR POST
  app.put("/api/post/edit/:id", function (req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    db.postTable
      .update({
        category: req.body.category,
        title: req.body.title,
        body: req.body.body,
        expired: false,
        expirationDate: moment().add(7, "d")
      }, {
        where: {
          id: req.body.id
        }
      })
      .then(function () {
        res.direct("/home");
      });
  });

  // DELETE ONE OF YOUR POSTS
  app.post("/api/post/delete/:id", function (req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id, 
    console.log("in delete route");
    db.postTable.destroy({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.redirect("/home");
    });
  });

  /*----------------COMMENT-MANAGER-----------------*/


  // CREATE A COMMENT
  // app.post("/api/comments", function (req, res) {

  //   // Add sequelize code for creating a post using req.body,
  //   db.commentTable
  //     .create({
  //       body: req.body.body,
  //       category: req.body.category
  //     })
  //     .then(function (response) {
  //       // then return the result using res.json
  //       res.json(response);
  //     });
  // });



  // DELETE ONE OF YOUR COMMENTS
  // app.delete("/api/post", function (req, res) {
  //   // Add sequelize code to delete a post where the id is equal to req.params.id, 
  //   db.commentTable.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (response) {
  //     // then return the result using res.json
  //     res.json(response);
  //   });
  // });


};