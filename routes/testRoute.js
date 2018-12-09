module.exports = function (app) {

    var db = require("../models");

app.get("/api/test/:zip", function (req, res) {
    // get 10 recent posts in user region
    db.postTable.findAll({ 
      limit: 10, 
      where: {
        zip: req.params.zip//location
      }
    }).then(function (response) {
        console.log(response);
    }); 
});
}
