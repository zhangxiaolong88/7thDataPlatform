'use strict';

/* Controllers */
define([], function() {
	var moneyController = [
		'$scope',
		'worldMapMoneyService',
		function($scope, worldMapMoneyService) {
			$scope.queue = worldMapMoneyService.query();
			$scope.queueHead = {
				id: 'ID',
				money: 'Money',
				name: 'Name',
				status: 'Status'
			};

			$scope.orderByCol = 'id';
			$scope.orderByReversed = false;

			$scope.flipOrderBy = function(col) {
				$scope.orderByReversed = (col == $scope.orderByCol) ? !$scope.orderByReversed : false;
				$scope.orderByCol = col;
			}
		}
	];

	var registerController = [
		'$scope',
		'worldMapRegisterService',
		function($scope, worldMapRegisterService) {
			$scope.queue = worldMapRegisterService.query();
			$scope.queueHead = {
				id: 'ID',
				register: 'Register',
				name: 'Name',
				status: 'Status'
			};

			$scope.orderByCol = 'id';
			$scope.orderByReversed = false;

			$scope.flipOrderBy = function(col) {
				$scope.orderByReversed = (col == $scope.orderByCol) ? !$scope.orderByReversed : false;
				$scope.orderByCol = col;
			}
		}
	];

	var activeController = [
		'$scope',
		'worldMapActiveService',
		function($scope, worldMapActiveService){
			$scope.queue = worldMapActiveService.query();
			$scope.queueHead = {
				id: 'ID',
				register: 'Active',
				name: 'Name',
				status: 'Status'
			};

			$scope.orderByCol = 'id';
			$scope.orderByReversed = false;

			$scope.flipOrderBy = function(col) {
				$scope.orderByReversed = (col == $scope.orderByCol) ? !$scope.orderByReversed : false;
				$scope.orderByCol = col;
			}
		}
	];

	return {
		worldMapMoneyController: moneyController,
		worldMapRegisterController: registerController,
		worldMapActiveController: activeController
	};
});