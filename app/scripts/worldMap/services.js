'use strict';

define([], function() {
	var moneyService = ['$resource',
		function($resource) {
			return $resource('/worldmap/money', {}, {
				query: {
					method: 'get',
					params: {
						id: 'list'
					},
					isArray: true
				}
			});
		}
	];

	var registerService = ['$resource',
		function($resource) {
			return $resource('/worldmap/register', {}, {
				query: {
					method: 'get',
					params: {
						id: 'list'
					},
					isArray: true
				}
			});
		}
	];

	var activeService = ['$resource',
		function($resource) {
			return $resource('/worldmap/active', {}, {
				query: {
					method: 'get',
					params: {
						id: 'list'
					},
					isArray: true
				}
			});
		}
	];

	return {
		worldMapMoneyService: moneyService,
		worldMapRegisterService: registerService,
		worldMapActiveService: activeService
	};

});