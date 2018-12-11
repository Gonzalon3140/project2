var db = require("../models");
var moment = require("moment");
var authentic = require("../views/index.handlebars")

module.exports = function (app) {
  var currentzip;
  /*---------------PAGE-POPULATOR----------------*/

  //var to find by zipcode
  //var location = authentic.location;

  // LOAD HOMEPAGE w/ all your posts and 10 most recent posts in your area
  // app.get("/api/user/:id", function (req, res) {
  app.get("/api/95618", function (req, res) {

    // get all user's posts
    currentzip = req.params.zip;
    db.postTable
      .findAll({
        where: {
          id: "1"
        }
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
  // }; //   // LOAD CATEGORY page containing all posts
  //   app.get("/api/:zip/:category", function (req, res) {
  //     db.PostTable.findAll({
  //       where: {
  //         category: req.params.category,
  //         zipcode: req.params.zip
  //       }
  //     }).then(function (resPosts) {
  //       res.render("category", {
  //         category: resPosts
  //       });
  //     });
  //   });

  //   /*---------------POST-MANAGER------------------*/


    db.postTable.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      expirationDate: moment().add(3, 'days').calendar() // will change based on category, set to 3 days
    }).then(function (response) {
      // then return the result using res.json
      res.json(response);
    });


  //     db.postTable.create({
  //       title: req.body.title,
  //       body: req.body.body,
  //       category: req.body.category,
  //       expirationDate: moment().add(3, 'days').calendar() // will change based on category, set to 3 days
  //     }).then(function (response) {
  //       // then return the result using res.json
  //       res.json(response);
  //     });

  //   });

  //   // DELETE ONE OF YOUR POSTS
  //   // app.delete("/api/posts/:id", function (req, res) {
  //   //   // Add sequelize code to delete a post where the id is equal to req.params.id,
  //   //   db.postTable
  //   //     .destroy({
  //   //       where: {
  //   //         id: req.params.id
  //   //       }
  //   //     })
  //   //     .then(function (response) {
  //   //       // then return the result using res.json
  //   //       res.json(response);
  //   //     });
  //   // });

  //   // UPDATE YOUR POST
  //   app.put("/api/posts", function (req, res) {
  //     // Add code here to update a post using the values in req.body, where the id is equal to
  //     db.postTable
  //       .update({
  //         title: req.body.title,
  //         body: req.body.body
  //       }, {
  //         where: {
  //           id: req.body.id
  //         }
  //       })
  //       .then(function (response) {
  //         // then return the result using res.json
  //         res.json(response);
  //       });
  //   });

  //   /*----------------COMMENT-MANAGER-----------------*/

  //   // CREATE A COMMENT
  //   app.post("/api/comments", function (req, res) {
  //     // Add sequelize code for creating a post using req.body,
  //     db.commentTable
  //       .create({
  //         body: req.body.body,
  //         category: req.body.category
  //       })
  //       .then(function (response) {
  //         // then return the result using res.json
  //         res.json(response);
  //       });
  //   });

  //   // DELETE ONE OF YOUR COMMENTS
  //   app.delete("/api/comments/:id", function (req, res) {
  //     // Add sequelize code to delete a post where the id is equal to req.params.id,
  //     db.commentTable.destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then(function (response) {
  //       // then return the result using res.json
  //       res.json(response);
  //     });
  //   });

  //   // UPDATE YOUR COMMENT
  //   app.put("/api/comments", function (req, res) {
  //     // Add code here to update a post using the values in req.body, where the id is equal to
  //     db.commentTable
  //       .update({
  //         body: req.body.body
  //       }, {
  //         where: {
  //           id: req.body.id
  //         }
  //       })
  //       .then(function (response) {
  //         // then return the result using res.json
  //         res.json(response);
  //       });
  //   });

  //   /*-------------USER-MANAGER----------------*/

  //   // ADD USER ACCOUNT
  //   app.post("/api/users", function (req, res) {
  //     // Add sequelize code for creating a post using req.body,
  //     db.userTable.create({
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: req.body.password, //check KAMRAN'S AUTHENTIFICATION
  //       zipcode: req.body.zipcode
  //     }).then(function (response) {
  //       // then return the result using res.json
  //       res.json(response);
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

  /*-------------USER-MANAGER----------------*/

  // ADD USER ACCOUNT
  app.post("/api/users", function (req, res) {
    // Add sequelize code for creating a post using req.body,

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

  /*
  module.exports = function(app) {
    // Get all examples
    app.get("/api/examples ", function(req, res) {
      db.Example.findAll({}).then(function(dbExamples) {
        res.json(dbExamples);
  >>>>>>> 34af0abb16b219a656e1dba6724baa2353ae8bf0
      });
    })



  }
  =======
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

};

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

  /*-------------USER-MANAGER----------------*/

  // ADD USER ACCOUNT
  // ADD USER ACCOUNT
  // app.post("/api/users", function (req, res) {
  //   // Add sequelize code for creating a post using req.body,
  //   var pass1 = $("#pass");
  //   var pass2 = $("#confirm")

  //   if (pass1 == pass2) {
  //     console.log("passwords identical");
  //     db.userTable.create({
  //       username: $("#user"),
  //       firstName: $("#first"),
  //       lastName: $("#last"),
  //       email: $("#email"),
  //       password: $("#pass"),
  //       zipcode: $("#zip")
  //     }).then(function (response) {
  //       // log success
  //       console.log("account activated");
  //       // then return the result using res.json
  //       var newAccount = response.comment[0].dataValues;
  //       res.json(newAccount);
  //       //inform user of success
  //       alert("Your account is succesfully added");
  //       //return to login page
  //       res.render("/home");
  //     });
  //   } else {
  //     console.log("passwords not identical");
  //     alert("passwords are not identical, please re-enter");
  //   }
  // });
  // app.post("/api/users", function (req, res) {
  //   // Add sequelize code for creating a post using req.body,

  //   db.userTable.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password, //check KAMRAN'S AUTHENTIFICATION
  //     zipcode: req.body.zipcode
  //   }).then(function (response) {
  //     // then return the result using res.json
  //     res.json(response);
  //   });


  // });

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

  /*
  module.exports = function(app) {
    // Get all examples
    app.get("/api/examples ", function(req, res) {
      db.Example.findAll({}).then(function(dbExamples) {
        res.json(dbExamples);
 
      });
    })



  }

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

};

};

