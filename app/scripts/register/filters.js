'use strict';

/* Filters */
define([
	'underscore',
	'common/filters',
	'worldMap/filters'
], function(_, cf, wf) {

	var filters = {
		commonFilter: cf,
		worldMapFilter: wf
	};

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