'use strict';

/* Controllers */
define([
	'routers/routers'
], function(routers) {
	var controllersObj = {};
	controllersObj.appController = ['$scope', '$state', '$cookieStore',
		function($scope, $state, $cookieStore) {
			$scope.currentUser = $cookieStore.get('user');

			// 判断登录
			if (!$scope.currentUser) {
				$state.go("system.login");
			}

			//页面model对象
			$scope.valueObj = {

			};


		}
	];

	return controllersObj;
});