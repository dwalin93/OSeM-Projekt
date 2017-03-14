var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var personSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    info: {
        type: String,
        required: false
    },
    registrDate: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    boxID: [{
        type: String,
        required: false
    }],
    boxName: [{
        type: String,
        required: false
    }],
    points: {
        type: Number,
        required: false
    },
    sbPoints: { // Neue Box = 5000 Punkte, neuer Sensor = 1000 Punkte, Messung = 1 Punkt pro Messung
        type: Number,
        required: false
    },
    hash: String,
    salt: String
});

personSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

personSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

personSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

const personModel = mongoose.model('Person', personSchema);

module.exports = {
  model:personModel,
  schema:personSchema
};


//mongoose.model('Person', userSchema);



