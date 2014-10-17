'use strict';
/* Services */
define([], function() {
	var services = {};

	services.loginService = ['$http', 'BASEPATH',
		function($http, BasePath) {
			return {
				login: function(userInfo) {
					return $http.post(BasePath + "/user/login", userInfo);
				}
			};
		}
	];

	return services;
});