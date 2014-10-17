'use strict';

/* Controllers */
define([], function() {
	var controllersObj = {};

	controllersObj.gameController = ['$scope',
		function($scope) {

			alert(123);
		}
	];

	return controllersObj;
});