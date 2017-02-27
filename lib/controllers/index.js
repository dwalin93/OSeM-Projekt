'use strict';

const usersController = require('./usersController'),
  boxesController = require('./boxesController'),
  statisticsController = require('./statisticsController'),
  sensorsController = require('./sensorsController'),
  authentication = require ('./authentication'),
  profile = require ('./profile'),
  users = require ('./users');


module.exports = {
  usersController,
  boxesController,
  statisticsController,
  sensorsController,
  authentication,
  profile,
  users
};
