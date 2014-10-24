'use strict';
/* Services */
define([], function() {
	var services = {};

	services.loginService = ['$http', 'BASEPATH',
		function($http, BasePath) {
			return {
				login: function(userInfo) {
					return $http.post(BasePath + "/user/login", userInfo);
				},
				checkLogin: function(){
					return $http.get(BasePath + "/user/checklogin");
				},
				logout: function(){
					return $http.get(BasePath + "/user/logout");
				}
			};
		}
	];

	return services;
});