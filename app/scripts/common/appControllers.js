'use strict';

/* Controllers */
define([], function() {
	var controllersObj = {};

	controllersObj.appController = ['$scope',
		function($scope) {

			// 判断登录
			// if (!$scope.currentUser) {
			// 	$state.go("login");
			// }

			// 系统当前的功能模块对象
			$scope.currentNav = {
				name: '',
				desc: '',
				currentSubNav: {
					name: '',
					desc: ''
				}
			};


		}
	];

	return controllersObj;
});