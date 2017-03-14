var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var fs = require('fs');
var path = require('path');


module.exports.profileUpdate = function(req, res) {
    if (!req.payload._id) {
        res.status(401);
        res.json({
            "message": "UnauthorizedError: cannot update profile without being logged in to it"
        });
    } else{
        Person.findByIdAndUpdate(req.payload._id, req.body, {runValidators: true, upsert: true})
            .exec(function (err, user) {
                res.status(200);
                res.json(user);
            })
    }
};

module.exports.profileDelete = function (req, res) {
    if (!req.payload._id) {
        res.status(401);
        res.json({
            "message": "UnauthorizedError: cannot delete profile without being logged in to it"
        });
    } else {
        Person.findById(req.payload._id)
            .exec(function (err, value) {
                if(err) {
                    res.status(401);
                    res.json({
                        "message": "DeleteError: could not delete feature"
                    });
                } else {
                    console.log('feature removed (logging just for testing)');
                    value.remove();
                    res.status(200);
                    res.send('removed Feature');
                }

            });
    }
};

module.exports.profileImage = function(req, res, next){

    Person.findById(req.payload._id).then(function (user){
        if (typeof req.body.image !== 'undefined' && req.body.image !== '') {
            const data = req.body.image.toString();
            const imageBuffer = decodeBase64Image(data);
            const extension = (imageBuffer.type === 'image/jpeg') ? '.jpg' : '.png';
            var time = new Date().getTime();
            try {
                //fs.writeFileSync('http://localhost:9000/app/userimages/'+req.payload._id + extension+ '', imageBuffer.data);
                fs.writeFileSync('./userimages/'+req.payload._id + extension+'', imageBuffer.data);
                user.image = (req.payload._id + extension);
            } catch (e) {
                return "error";//next(new restify.InternalServerError(JSON.stringify(e.message)));
            }
        }
        user.save();

    });
    res.status(200);
    res.json ({ 'message': 'Image saved'

    });
};

/*module.exports.getImage = function (req,res){

    Person.findById(req.payload._id).then(function (user){

        var readStream = fs.createReadStream('./userimages/'+ user.image);

        readStream.on('open', function(){
            readStream.pipe(res);
            res.status(200);
        });

        readStream.on('error', function(err) {
            res.end(err);
            res.status(400);
        });
    })
};
*/
module.exports.getImage = function (req,res){

    Person.findById(req.payload._id).then(function (user){

        var fileString = user.image;
        var lastDot = fileString.lastIndexOf('.');
        var extension = fileString.substring(lastDot+1);
        console.log(extension);

        if(extension === '.jpg') {
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            var readStream = fs.createReadStream('./userimages/' + user.image);
            readStream.on('open', function () {
                readStream.pipe(res);
            });
        }

        if(extension === '.png') {
            res.writeHead(200, {'Content-Type': 'image/png'});
            var readStream2 = fs.createReadStream('./userimages/' + user.image);
            readStream2.on('open', function(){
                readStream2.pipe(res);
            });
        }

        readStream.on('error', function(err) {
            res.end(err);
            res.status(400);
        });

        readStream2.on('error', function(err) {
            res.end(err);
            res.status(400);
        });
    })
};

module.exports.savePoints = function(req, res){
    if (!req.payload._id) {
        res.status(401);
        res.json({
            "message": "UnauthorizedError: cannot save points without being logged in"
        });
    } else {
        Person.findById(req.payload._id, function (err, user) {
            if (err) {
                res.status(401);
                res.json("unable to save points");
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

module.exports.saveSbPoints = function(req, res){
    if (!req.payload._id) {
        res.status(401);
        res.json({
            "message": "UnauthorizedError: cannot save points without being logged in"
        });
    } else {
        Person.findById(req.payload._id, function (err, user) {
            if (err) {
                res.status(401);
                res.json("unable to save points");
            } else {
                user.sbPoints = +user.sbPoints + +req.params.sbPoints;
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

    Person.find({}, {firstname: 1, lastname: 1, username: 1, points: 1, _id: 1}, {"sort": { points: -1 }}, function(err, users){
        if (err){
            res.status(401);
            res.json({
                "message" : "unable to find the users"
            });
        } else {
            res.status(200);
            res.send(users);
        };
    });
};
module.exports.getPublicProfile = function (req, res){
    Person
        .findById(req.params.id)
        .exec(function(err, user) {
            res.status(200);
            res.json(user);
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


