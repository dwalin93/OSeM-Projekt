var mongoose = require('mongoose');
var Person = mongoose.model('Person');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401);
    res.json({
      "header" : "UnauthorizedError: private profile"
    });
  } else {
    Person
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200);
        res.json(user);
      });
  }

};
