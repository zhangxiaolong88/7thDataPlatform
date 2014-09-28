'use strict';

/* Directives */
define([
	'underscore',
	'common/directives',
	'worldMap/directives'
], function(_, cd, wd) {

	var directives = {
		commonDirective: cd,
		worldMapDirective: wd
	};

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