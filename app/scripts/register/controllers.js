'use strict';

/* Controllers */
define([
	'underscore',
	'routers/routers',
	'common/appControllers',
	'system/controllers'
], function(_, routers, ac, sc, bsc) {

	var controllers = {};
	controllers = _.extend(controllers, ac, sc, bsc);

	var setUpRouters = function(angModule) {
		angModule.config(function($stateProvider, $urlRouterProvider) {

			// 定义：单个路由绑定函数
			var singleBind = function(v) {
				$stateProvider
					.state(v.route, {
						abstract: v.abstract || false,
						url: v.url,
						templateUrl: v.template,
						controller: v.controller
					});
			};

			// 定义：列表路由递归循环绑定函数
			var listBind = function(list) {
				_each(list, function(v, k) {
					if (v.route) {
						singleBind(v);
					} else if (v.list) {
						routersBind(v.list);
					}
				});
			};

			// 绑定路由
			listBind(routers);

			// 设置默认路由
			$urlRouterProvider.otherwise(routers.login.url);
		});
		angModule.run(function($rootScope) {
			$rootScope.$on('$routeChangeSuccess', function(next, last) {
				console.log("Navigating from ", last);
				console.log("Navigating to ", next);
			});
		});
	};

	// 初始化控制器和路由器
	var initialize = function(angModule) {
		_.each(controllers, function(controller, name) {
			angModule.controller(name, controller);
		});
		console.log("Custom controller initialized.");

		// 加载路由
		setUpRouters(angModule);
		console.log("Custom routers initialized.");
	};

	return {
		initialize: initialize
	};
});