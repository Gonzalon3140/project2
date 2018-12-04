var db = require("../models");
var Op = Sequelize.Op;

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    //refer to login
    //unless logged in, then refer to main
  });

  // Load your page with all your posts and all of the most recent posts
  app.get("/:zip", function(req, res) {
    // get all user posts
    db.Posts.findAll({ where: { zip: req.params.zip } /* && limited by most recent */}).then(function(userposts) {
      res.render("main", {
        userfeed: userposts
      });
    });
    // get all recent posts in user region
    db.Posts.findAll({ where: { zip: req.params.zip } /* && limited by most recent */}).then(function(recent) {
      res.render("main", {
        localfeed: recent
      });
    });
  });

  // Load Category page containing all posts
  app.get("/:zip/:category", function(req, res) {
    db.Posts.findAll({ where: { category: req.params.category }, [Op.and]: { zip: req.params.zip } }).then(function(resPosts) {
      res.render("Category", {
        category: resPosts
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

/*-----------------------------------------------------

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
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
-----------------------------------------------------*/