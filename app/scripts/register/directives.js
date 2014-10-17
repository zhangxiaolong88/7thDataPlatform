'use strict';

/* Directives */
define([
	'underscore',
	'common/directives'
], function(_, cd) {
	
	var directives = {};
	directives = _.extend(directives, cd);

	var initialize = function(angModule) {
		_.each(directives, function(filter, name) {
			angModule.directive(name, filter);
		})
		console.log("Custom directives initialized.");
	};

	return {
		initialize: initialize
	};
});