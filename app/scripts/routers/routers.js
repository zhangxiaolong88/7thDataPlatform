'use strict';

define([], function() {
	return {
		login: {
			title: '登录',
			route: 'login',
			url: '/login',
			template: 'views/layouts/login.html',
			controller: 'loginController'
		},
		main: {
			abstract: true,
			title: '布局',
			route: 'main',
			url: '',
			template: 'views/layouts/mainLayout.html',
			controller: 'appController',
		},
		menu: {
			title: '菜单',
			list: {
				items: {
					title: '基本配置',
					icon: 'icon-grid',
					list: {
						game: {
							title: '游戏管理',
							route: 'main.game',
							url: '/game',
							template: 'views/items/game/game.html',
							controller: 'gameController',
							desc: '增加一个新的游戏或者删除一个旧的'
						},
						agent: {
							title: '代理商管理',
							route: 'main.agent',
							url: '/agent',
							template: 'views/items/agent.html',
							controller: 'agentController',
							desc: '仅用于大数据系统，将现有的各游戏中相同的代理商合并'
						},
						area: {
							title: '地区管理',
							route: 'main.area',
							url: '/area',
							template: 'views/items/area.html',
							controller: 'areaController',
							desc: '仅用于大数据系统，将世界地图对地区进行了划分'
						},
						func: {
							title: '模块管理',
							route: 'main.module',
							url: '/module',
							template: 'views/items/module.html',
							controller: 'moduleController',
							desc: '增加一个新的功能模块或者删除一个旧的'
						}
					}
				},
				users: {
					title: '用户管理',
					icon: 'icon-user',
					list: {
						account: {
							title: '帐号管理',
							route: 'main.account',
							url: '/account',
							template: 'views/user/account.html',
							controller: 'accountController',
							desc: '注册或删除用户的帐号'
						},
						authority: {
							title: '权限管理',
							route: 'main.authority',
							url: '/authority',
							template: 'views/user/authority.html',
							controller: 'authorityController',
							desc: '在这里管理每个用户的系统、游戏、菜单、功能按钮等权限'
						},

					}
				}
			}

		}
	};
});