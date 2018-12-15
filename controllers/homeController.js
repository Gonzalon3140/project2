var exports = (module.exports = {});

exports.getHomePage = function(req, res) {
  var zip = req.user.dataValues.zip;
  var name = req.user.dataValues.name;
  res.render("home", { zip: zip, name: name });
};

exports.getZipPost = function(req, res) {
  res.render("home", { zip: req.params.zip });
};