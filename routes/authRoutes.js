// Export not working, so files temporarily in htmlRoutes.js file

module.exports = function(app) {
  // Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });
  app.get("/google", function(req, res) {
    //handle with passport
    res.send("Logging in with Google...");
  });
  app.get("/logout", function(req, res) {
    //handle with passport
    res.send("Logging out...");
  });
}
