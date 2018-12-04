var db = require("../models");

module.exports = function(app) {
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

  // CREATE A POST
  app.post("/api/posts", function(req, res) {
    // Add sequelize code for creating a post using req.body,
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    }).then(function(response) {
      // then return the result using res.json
      res.json(response);
    });
  });

  // DELETE ONE OF YOUR POSTS
  app.delete("/api/posts/:id", function(req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id, 
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(response) {
      // then return the result using res.json
      res.json(response);
    });
  });

  // UPDATE YOUR POST
  app.put("/api/posts", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    db.Post.update({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category      
    },{
      where: {
        id: req.body.id
      }
    }).then(function(response) {
      // then return the result using res.json
      res.json(response);
    });
  });

    // UPDATE YOUR POST
    app.put("/api/posts", function(req, res) {
      // Add code here to update a post using the values in req.body, where the id is equal to
      db.Post.update({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category      
      },{
        where: {
          id: req.body.id
        }
      }).then(function(response) {
        // then return the result using res.json
        res.json(response);
      });
    });
}

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
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
*/
