'use strict';

define([], function() {
	return {
		main: {
			abstract: true,
			title: '布局',
			route: 'main',
			url: '',
			template: 'views/layouts/mainLayout.html',
			controller: 'appController',
		},
		login: {
			title: '登录',
			route: 'main.login',
			url: '/login',
			template: 'views/layouts/login.html',
			controller: 'LoginController'
		},
		menu: {
			title: '菜单',
			list: {
				index: {
					title: '基本配置',
					list: {
						game: {
							title: '游戏管理',
							route: 'main.game',
							url: '/game',
							template: 'views/game.html',
							controller: 'gameController'
						},
						agent: {
							title: '代理商管理',
							route: 'main.agent',
							url: '/agent',
							template: 'views/agent.html',
							controller: 'agentController'
						},
						area: {
							title: '地区管理',
							router: 'main.area',
							url: '/area',
							template: 'views/area.html',
							controller: 'areaController'
						},
						func: {
							title: '模块管理',
							router: 'main.module',
							url: '/module',
							template: 'views/module.html',
							controller: 'moduleController'
						}
					}
				},
				users: {
					title: '用户管理',
					list: {
						account: {
							title: '帐号管理',
							route: 'main.account ',
							url: '/account',
							template: 'views/account.html',
							controller: 'accountController'
						},
						authority: {
							title: '权限管理',
							route: 'main.authority',
							url: '/authority',
							template: 'views/authority.html',
							controller: 'authorityController'
						},
						
					}
				}
			}

		}
	};
});