'use strict';

const requestUtils = require('./requestUtils'),
  controllers = require('./controllers'),
  config = require('./utils').config,
  jwt = require('restify-jwt');

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});


const { usersController, statisticsController, boxesController, sensorsController, users, profile, authentication} = controllers;

const initRoutes = function initRoutes (server) {
  // the ones matching first are used
  // case is ignored

  // attach a function for user parameters
  server.use(requestUtils.initUserParams);

    server.post({path: '/users/:_id', version:'0.0.1'}, auth, users.profileUpdate);
    server.post({path: '/users/delete/:_id', version:'0.0.1'}, auth, users.profileDelete);

  // attach a function to validate boxId and sensorId parameters
  // check parmeters for possible box Id parameters
  // everything of the like
  // 'boxId', 'boxid', 'senseBoxIds', 'senseBoxId'
  // can be used
  server.use(requestUtils.validateIdParams);

//UM

    server.get({path:'/profile',version:'0.0.1'}, auth, profile.profileRead);
    server.get({path:'/allProfiles',version:'0.0.1'}, users.allProfiles);
    server.get({path:'/allProfilesBox',version:'0.0.1'}, users.allProfilesBox);
    server.get({path:'/publicProfile/:id', version:'0.0.1'}, users.getPublicProfile);
    server.get({path:'/game/:points', version:'0.0.1'}, auth, users.savePoints);
    server.get({path:'/osem/:sbPoints', version:'0.0.1'}, auth, users.saveSbPoints);
    server.get({path:'/image', version:'0.0.1'}, auth, users.getImage);





  // GET
    server.get({ path: config.basePath, version: '0.0.1' }, boxesController.findAllBoxes);
  server.get({ path: `${config.basePath}/:boxId`, version: '0.0.1' }, boxesController.findBox);
  server.get({ path: `${config.basePath}/:boxId/sensors`, version: '0.0.1' }, boxesController.getMeasurements);
  server.get({ path: `${config.basePath}/:boxId/data/:sensorId`, version: '0.0.1' }, boxesController.getData);
  server.get({ path: `${config.basePath}/data`, version: '0.1.0' }, boxesController.getDataMulti);
  server.get({ path: `${config.basePath}/:boxId/:sensorId/submitMeasurement/:value`, version: '0.0.1' }, boxesController.postNewMeasurement);

  server.get({ path: '/stats', version: '0.1.0' }, statisticsController.getStatistics);
  server.get({ path: `${config.statisticsPath}/idw` }, statisticsController.getIdw);



  // POST
// authentication POST


    //POST Profile


    server.post({path:'/register', version:'0.0.1'},authentication.register);
    server.post({path: '/login',version:'0.0.1'}, authentication.login);
    server.post({path: '/logout', version:'0.0.1'},authentication.logout);

  server.post({ path: config.basePath, version: '0.0.1' }, auth, boxesController.postNewBox);
  server.post({ path: `${config.basePath}/:boxId/:sensorId`, version: '0.0.1' }, boxesController.postNewMeasurement);
  server.post({ path: `${config.basePath}/:boxId/data`, version: '0.1.0' }, boxesController.postNewMeasurements);
  server.post({ path: `${config.basePath}/data`, version: '0.1.0' }, boxesController.getDataMulti);
    //PUT Profilimage
    server.put({path: '/users/image',version:'0.1.0'}, auth, users.profileImage);

  // Secured (needs authorization through apikey)

  // attach a function to secured requests to validate api key and box id
  server.use(requestUtils.validateAuthenticationRequest);

  // GET
  server.get({ path: `${config.userPath}/:boxId`, version: '0.0.1' }, usersController.validApiKey);
  server.get({ path: `${config.basePath}/:boxId/script`, version: '0.1.0' }, boxesController.getScript);

  // PUT

  server.put({ path: `${config.basePath}/:boxId`, version: '0.1.0' }, boxesController.updateBox);
    //PUT Profil


  // DELETE
  server.del({ path: `${config.basePath}/:boxId`, version: '0.1.0' }, boxesController.deleteBox);
  server.del({ path: `${config.basePath}/:boxId/:sensorId/measurements`, version: '0.0.1' }, sensorsController.deleteSensorData);

};


module.exports = initRoutes;


