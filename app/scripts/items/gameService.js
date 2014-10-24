'use strict';
/* Services */
define([], function() {
	var services = {};

	services.gameService = ['$http', 'BASEPATH',
		function($http, BasePath) {
			return {
				getGames: function(params) {
					return $http.get(BasePath + "/game/getGames?pageCount="+params.pageCount+"&currentPage="+params.currentPage);
				},
				addGame: function(gameInfo){
					return $http.post(BasePath + "/game/addGame", gameInfo);
				},
				updateGame: function(gameInfo){
					return $http.post(BasePath + "/game/updateGame", gameInfo);
				},
				deleteGame: function(gameInfo){
					return $http.post(BasePath + "/game/deleteGame", gameInfo);
				}
			};
		}
	];


	return services;
});