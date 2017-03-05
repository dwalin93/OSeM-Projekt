var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');
var path = require('path');
//var restify = require('restify');

module.exports.profileUpdate = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: cannot update profile without being logged in to it"
    });
  } else{
    User.findByIdAndUpdate(req.payload._id, req.body, {runValidators: true, upsert: true})
      .exec(function (err, user) {
        res.status(200).json(user);
      })
  }
};

module.exports.profileDelete = function (req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: cannot delete profile without being logged in to it"
    });
  } else {
    User.findById(req.payload._id)
      .exec(function (err, value) {
        if(err) {
          res.status(401).json({
            "message": "DeleteError: could not delete feature"
          });
        } else {
          console.log('feature removed (logging just for testing)');
          value.remove();
          res.status(200).send('removed Feature');
        }

      });
  }
};

module.exports.profileImage = function(req, res, next){

  User.findById(req.payload._id).then(function (user){
    if (typeof req.body.image !== 'undefined' && req.body.image !== '') {
      const data = req.body.image.toString();
      const imageBuffer = decodeBase64Image(data);
      const extension = (imageBuffer.type === 'image/jpeg') ? '.jpg' : '.png';
      var time = new Date().getTime();
      try {
        fs.writeFileSync('app/userimages/'+req.payload._id + extension+'', imageBuffer.data);
        user.image = (req.payload._id + extension);
      } catch (e) {
        return "error";//next(new restify.InternalServerError(JSON.stringify(e.message)));
      }
    }
    user.save();

  });
  res.status(200).json({
    "message" : "image saved"
  });
};

module.exports.savePoints = function(req, res){
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: cannot save points without being logged in"
    });
  } else {
    User.findById(req.payload._id, function (err, user) {
      if (err) {
        res.status(401).json("unable to save points");
      } else {
          user.points = +user.points + +req.params.points;
          user.save(function (err) {
            res.status(200);
            res.json({
              "message": "points are saved"
            });
          });
        }
    });
  }
};

module.exports.allProfiles = function(req, res){

  User.find({}, {firstname: 1, lastname: 1, username: 1, points: 1, _id: 0}, {"sort": { points: -1 }}, function(err, users){
    if (err){
      res.status(401).json({
        "message" : "unable to find the users"
      });
    } else {
      res.status(200);
      res.send(users);
    };
  });
};

const decodeBase64Image = function (dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
};
