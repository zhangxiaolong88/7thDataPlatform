'use strict';

/* Controllers */
define([
	'underscore',
	'routers/routers',
	'common/appControllers',
	'system/controllers',
	'items/controllers',
	'user/controllers'
], function(_, routers, ac, sc, ic, uc) {

	var controllers = {};
	controllers = _.extend(controllers, ac, sc, ic, uc);

	var setUpRouters = function(angModule) {
		angModule.config(function($routeProvider, $stateProvider, $urlRouterProvider) {

			// 定义：单个路由绑定函数
			var singleBind = function(v) {
				$stateProvider
					.state(v.route, {
						abstract: v.abstract || false,
						url: v.url || '',
						templateUrl: v.template,
						controller: v.controller
					});
			};

			// 定义：列表路由递归循环绑定函数
			var listBind = function(list) {
				_.each(list, function(v, k) {
					if (v.route) {
						// 如果没有子级
						singleBind(v);
					} else if (v.list) {
						// 如果有子级
						listBind(v.list);
					}
				});
			};

			// 绑定路由
			listBind(routers);

			// 设置默认路由
			$urlRouterProvider.otherwise(routers.login.url);

		});

		angModule.run(['$rootScope',
			function($rootScope) {
				$rootScope.$on('$locationChangeSuccess', function(event, next, current) {
					console.log("Navigating FROM <" + current + "> TO <" + next + ">");
				});
			}
		]);
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