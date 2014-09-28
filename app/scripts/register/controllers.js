'use strict';

/* Controllers */
define([
	'underscore',
	'routers/routers',
	'common/appControllers',
	'worldMap/controllers'
], function(_, routers, ac, wc) {

	var controllers = {};
	controllers = _.extend(controllers, ac, wc);

	var setUpRouters = function(angModule) {
		angModule.config(function($stateProvider, $urlRouterProvider) {
			_.each(routers, function(value, key) {
				// 如果没有子级菜单
				if (!!value.template && !!value.controller) {
					$stateProvider
						.state(value.title, {
							url: value.route,
							templateUrl: value.template,
							controller: value.controller
						});

				} else {
					// 如果是父级菜单（大多数情况）
					if (!!value.list && value.list.length != 0) {
						_.each(value.list, function(v, k) {
							$stateProvider
								.state(v.title, {
									url: v.route,
									templateUrl: v.template,
									controller: v.controller
								});
						});
					}
				}
			});
			$urlRouterProvider.otherwise(routers.home.route);
		});
		angModule.run(function($rootScope) {
			$rootScope.$on('$routeChangeSuccess', function(next, last) {
				console.log("Navigating from ", last);
				console.log("Navigating to ", next);
			});
		});
	};

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