'use strict';

/* Controllers */
define([], function() {
	var controllersObj = {};

	controllersObj.appController = ['$scope', '$state', 'loginService',
		function($scope, $state, loginService) {

			// 系统当前的功能模块对象
			$scope.currentNav = {
				name: '',
				currentSubNav: {
					name: '',
					desc: ''
				}
			};

			// header.html 登出功能
			$scope.logout = function(){
				loginService.logout().success(function(result){
					if(result.status === 1){
						$state.go("login");
					}
				});
			};
		}
	];

	return controllersObj;
});