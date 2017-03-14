/**
 * Created by pglah on 09.03.2017.
 */
'use strict';

const requestUtils = require('./requestUtils'),
    controllers = require('./controllers'),
    config = require('./utils').config,
    express = require('express'),
    jwt = require('express-jwt');

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

const {profile, authentication, users } = controllers;

// Usermanagement
const initRoutesUM = function initRoutesUM (server) {
 //GET Profile
 server.get('/profile', auth, profile.profileRead);
 server.get('/allProfiles', users.allProfiles);
 server.get('/game/:points', auth, users.savePoints);
 server.get('/image', auth, users.getImage);
 //POST Profile
 server.post('/users/:_id', auth, users.profileUpdate);
 server.post('/users/delete/:_id', auth, users.profileDelete);
 //PUT Profile
 server.put('/users/image', auth, users.profileImage);


 // authentication POST
 server.post('/register', authentication.register);
 server.post('/login', authentication.login);
 server.post('/logout', authentication.logout);
 };


module.exports = initRoutesUM;