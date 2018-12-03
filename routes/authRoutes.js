// Export not working, so files temporarily in htmlRoutes.js file
var passport= require("passport");

module.exports = function(app) {
  app.get("/login", function(req, res) {
    res.render("login");
  });
  
  app.get("/google", passport.authenticate("google",{
    scope:["profile"]
  }));

  app.get("/logout", function(req, res) {
    //handle with passport
    res.send("Logging out...");
  });

  app.get("/google/redirect", function(req,res){
    res.send("Callback URI reached succesfully");
  });
}
