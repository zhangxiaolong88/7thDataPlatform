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
			
			var bindState = function(v){
				$stateProvider
					.state(v.route, {
	            		abstract: v.abstract || false,
						url: v.url,
						templateUrl: v.template,
						controller: v.controller
					});
			}

			_.each(routers, function(value, key) {
				// 如果没有子级菜单
				if (value && value.route) {
					bindState(value);
				}
				if (value && value.list) {
					// 如果是父级菜单（大多数情况）
					_.each(value.list, function(v, k) {
						if(v.route){
							bindState(v);
						}
						if(v.list){
							_.each(v.list,function(vv, kk){
								if(vv.route){
									bindState(vv);
								}
							});
						}
					});
				}
			});

			//默认路由
			$urlRouterProvider.otherwise(routers.login.url);
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