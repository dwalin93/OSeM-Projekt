var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');
var path = require('path');
var restify = require('restify');

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
    const qrys = [];
    User.findById(req.payload._id).then(function (user){
        if (typeof req.body.image !== 'undefined' && req.body.image !== '') {
            console.log(req.body.image);
            const data = req.body.image.toString();
            const imageBuffer = requestUtils.decodeBase64Image(data);
            const extension = (imageBuffer.type === 'image/jpeg') ? '.jpg' : '.png';
            var time = new Date().getTime();
            try {
                fs.writeFileSync('/app/userimages/'+req.payload._id + extension+'', imageBuffer.data);
                qrys.push(box.set({ image: ''+req.payload._id + extension+ time +'' }));
            } catch (e) {
                return next(new restify.InternalServerError(JSON.stringify(e.message)));
            }
        }
        qrys.push(user.save());
    });
    res.send(200, user);
};

module.exports.savePoints = function(req, res){
    console.log(req.params.points);
    User.findById(req.payload._id, function (err, user){
        if(err){
            res.status(401).json("unable to save points");
        } else {
            user.points = req.params.points;
            user.save();
            res.status("200").json("saved points");
        }
    });
};
/*
 module.exports.updateUser = function (req, res) {

 updateUser2(req.param._id, req.body)
 .then(function(){
 res.sendStatus(200);
 })
 .catch(function(err){
 res.status(400).send(err);
 });
 };
 function updateUser2(_id, userParam){
 var newUser = userParam;
 updateUser3();

 User.findOne({id: _id}, function(err, user){
 if (err){
 console.log("error");
 }
 if (user.username !== newUser.username) {
 User.findOne({username: newUser.username}, function (err, user){
 if (err){
 console.log("error");
 }
 if(user) {
 console.log("Username" + newUser.username + " ist schon vergeben");
 }
 else {
 updateUser3();
 }
 });
 } else {
 updateUser3();
 }
 });

 function updateUser3(){
 console.log("guten tag");
 var set = {
 firstname: newUser.firstname,
 lastname: newUser.lastname,
 email: newUser.email,
 username: newUser.username
 };

 if(newUser.password){
 set.setPassword(newUser.password);
 }

 User.findOneAndUpdate({id: _id}, {$set: set});

 var token;
 token = user.generateJwt();
 res.status(200);
 res.json({
 "token" : token
 });
 }
 }*/

