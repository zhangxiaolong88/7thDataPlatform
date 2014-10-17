'use strict';

/* Controllers */
define(['../routers/routers'], function(routers) {
	var controllersObj = {};

	//左侧菜单控制器
	controllersObj.menuController = ['$scope', '$state',
		function($scope, $state) {
			$scope.menu = routers.menu.list;

			// 监视url的hash值变化
			$scope.$watch(function() {
				return $state.current.name;
			}, function(newV, oldV) {
				for (var nav in $scope.menu) {
					var navMenu = $scope.menu[nav];
					navMenu.active = false;
					var f = 0;
					for (var subNav in navMenu.list) {
						var subMenu = navMenu.list[subNav];
						
						subMenu.active = false;
						if (subMenu.route == newV) {
							subMenu.active = true;
							// 设置父容器的当前子模块
							$scope.currentNav.currentSubNav.name = subMenu.title;
							$scope.currentNav.currentSubNav.desc = subMenu.desc;
							f = 1;
						}
					}
					if (f === 1) {
						navMenu.active = true;
						// 设置父容器的当前父模块
						$scope.currentNav.name = navMenu.title;
						$scope.currentNav.desc = navMenu.desc;
					}
				}

			});
		}
	];

	return controllersObj;
});