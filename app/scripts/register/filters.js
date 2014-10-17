'use strict';

/* Filters */
define([
	'underscore',
	'common/filters'
], function(_, cf) {
	
	var filters = {};
	filters = _.extend(filters, cf);

	var initialize = function(angModule) {
		_.each(filters, function(filter, name) {
			angModule.filter(name, filter);
		});
		console.log("Custom filters initialized.");
	};

	return {
		initialize: initialize
	};
});