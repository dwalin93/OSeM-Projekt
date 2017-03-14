'use strict';

const Box = require('./box'),
  User = require('./user'),
  Measurement = require('./measurement'),
  Sensor = require('./sensor'),
  Person = require('./users');

module.exports = {
  Box: Box.model,
  User: User.model,
  Measurement: Measurement.model,
  Sensor: Sensor.model,
  Person: Person.model  // Überall ändern
};
