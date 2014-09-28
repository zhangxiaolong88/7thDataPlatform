'use strict';

/* Directives */
define([], function() {
	var directives = {};
	directives.mydirective = function() {
		return {
			restrict: "EA",
			template: "<strong>myDirective</strong>",
			replace: true
		};
	};
	directives.appVersion = function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	};
	return directives;
});