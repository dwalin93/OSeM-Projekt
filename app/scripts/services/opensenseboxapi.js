'use strict';

/**
 * @ngdoc service
 * @name openSenseMapApp.OpenSenseBoxAPI
 * @description Defines the settings for the OpenSenseBox API such as the URL
 * # OpenSenseBox
 * Factory in the openSenseMapApp.
 */
angular.module('openSenseMapApp')
	.factory('OpenSenseBoxAPI', function () {
		var api = {
			url: 'http://192.168.99.100:8000'
		};
		return api;
	});
