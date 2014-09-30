'use strict';
/* Services */
define([], function() {
	var services= {};

	services.loginService  = ['$http','APIBasePath',function($http,APIBasePath){
		return {
			login:function(userInfo){
				return $http.post(APIBasePath+"/system/login",userInfo);
			}
		};
	}];

	services.System  = ['$http','APIBasePath',function($http,APIBasePath){
		return {
			getSystemRights:function(systemId){
				return $http.get(APIBasePath+"/system/metro?systemId="+systemId);
			}
		};
	}];

	return services;
});