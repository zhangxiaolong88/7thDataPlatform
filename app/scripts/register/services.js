'use strict';

/* Services */
define([
	'underscore',
	'common/services',
	'system/services',
	'items/services'
], function(_, cs, ss, is) {

	var services = {};
	services = _.extend(services, cs, ss, is);
	
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