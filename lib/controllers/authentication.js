var passport = require('passport');
var mongoose = require('mongoose');
var models = require('../models');

var Person = mongoose.model('Person'); //Person

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new Person();

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.username = req.body.username;
    user.registrDate = Date.now();
    user.points = 0;
    user.sbPoints = 0;

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });

};

module.exports.login = function (req, res, info) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }


    var token;

    Person.findOne({username: req.body.username}, function (err, user) {
        if (err) {
            res.status(401);
            res.json({
                "message": "can't login"
            })
        }
        if (!user.validPassword(req.body.password)) {
            res.status(401);
            res.json({
                "message": "wrong password"
            })
        } else {
            if (user) {
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                });
            } else {
                // If user is not found
                res.status(401);
                res.json(info);
            }
        }
    });
    (req, res);

};


module.exports.logout = function (req, res, info) {
    var token;
    if (err) {
        res.status(404);
        res.json(err);
        return;
    }
    if (user) {

        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token,
            status: 'Tschüss!'
        });
    }
    else {
        res.status(401);
        res.json(info);
    }
    (req, res);
};



