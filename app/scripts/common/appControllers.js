'use strict';

/* Controllers */
define([
	'routers/routers'
], function(routers) {
	var controller = ['$scope',
		function($scope) {
			// 目录数据
			$scope.navigation = routers;
		}
	];
	
	return {
		appController: controller
	};
});