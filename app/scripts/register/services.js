'use strict';

/* Services */
define([
	'underscore',
	'common/services',
	'worldMap/services'
], function(_, cs, ws) {

	var services = {};
	services = _.extend(services, cs, ws)
	
	var initialize = function(angModule) {
		_.each(services, function(service, name) {
			angModule.factory(name, service);
		});
		console.log("Custom services initialized.");
	};

	return {
		initialize: initialize
	};
});