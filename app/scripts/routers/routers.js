'use strict';

define([], function() {
	return {
		loginLayout: {
			abstract: true,
			title: '布局',
			route: 'login',
			url: '',
			template: 'views/layouts/loginLayout.html',
			controller: 'appController',
		},
		login: {
			title: '登录',
			route: 'login.main',
			url: '/login',
			template: 'views/layouts/login.html',
			controller: 'LoginController'
		},
		system: {
			abstract: true,
			title: '系统',
			route: 'system',
			defaultRoute:"system.fiveForce",
			url: '/system',
			template: 'views/layouts/mainLayout.html',
			controller: 'appController',
			isSys: true,
			sysIco: "fa-windows",
			size: 21,
			key: 1,
			list: {
				index: {
					title: '指标分析',
					key: 12,
					list: {
						fiveForce: {
							title: '五力模型',
							route: 'system.fiveForce',
							url: '/fiveForce',
							template: 'views/businessSystem/fiveForce.html',
							controller: 'tablesController',
							key: 121,
						},
						trend: {
							title: '指标趋势看盘',
							route: 'system.trend',
							url: '/trend',
							template: 'views/businessSystem/demo.html',
							controller: 'demoController',
							key: 122,
						},
						plate: {
							title: '板块看盘',
							route: 'system.plate',
							url: '/plate',
							template: 'views/businessSystem/demo.html',
							controller: 'demoController',
							key: 123,
						},
						retention: {
							title: '新用户留存率',
							route: 'system.retention',
							url: '/retention',
							template: 'views/businessSystem/tables.html',
							controller: 'tablesController',
							key: 124,
						},
						funnel: {
							title: '新用户漏斗模型',
							route: 'system.funnel',
							url: '/funnel',
							template: 'views/businessSystem/demo.html',
							controller: 'demoController',
							key: 125,
						},
						activeLogin: {
							title: '活跃登录在线',
							route: 'system.activeLogin',
							url: '/activeLogin',
							template: 'views/businessSystem/demo.html',
							controller: 'demoController',
							key: 126
						}
					}
				}
			}

		}
	};
});