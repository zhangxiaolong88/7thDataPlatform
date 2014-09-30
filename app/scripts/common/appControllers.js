'use strict';

/* Controllers */
define([
	'routers/routers'
], function(routers) {
	var controllersObj = {};
	controllersObj.appController = ['$scope','$state','$cookieStore',
		function($scope,$state,$cookieStore) {
			$scope.currentUser = $cookieStore.get('user');
			//页面model对象
			$scope.valueObj = {
			};

			if($state.current.name == 'system.metro'){
				$scope.valueObj.isMetro = true;
			}else if($state.current.name == 'system.login'){
				$scope.valueObj.isLogin = true;
			}

			if (!$scope.currentUser) {
				$state.go("system.login");
			}
			
			//通知搜索区修改游戏宽度
			$scope.$watch(function(){
				return $scope.valueObj.showSidebar;
			},function(){
				$scope.$broadcast('showSidebar', $scope.valueObj.showSidebar);
			});
		}
	];

	return controllersObj;
});