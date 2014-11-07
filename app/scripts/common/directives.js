'use strict';

/* Directives */
define(['jquery'], function($) {
	var directives = {};

	directives.pageCountSelect = function() {
		return {
			restrict: "EA",
			template: "<select ng-transclude></select>",
			transclude: true,
			replace: true,
			link: function($scope, $element, $attrs) {
				$($element).select2({
					minimumResultsForSearch: "-1"
				}).change(function(args) {
					$scope.$apply(function() {
						$scope.pageObj.pageCount = args.val;
						$scope.getData(1);
					});
				});

			}
		};
	};

	directives.pickDateRange = function() {
		return {
			restrict: "A",
			template: "<div id='div_date' class='date'>" +
				"<span id='date' class='date_title'></span>" +
				"<a href='javascript:void(0);' id='input_trigger' class='opt_sel'>" +
				"<i class='i_orderd'></i>" +
				"</a>" +
				"</div>",
			transclude: true,
			scope: {
				dateObj: "="
			},
			link: function($scope, $element, $attrs) {
				console.log($scope.dateObj);
				var dataRange = new pickerDateRange("date", {
					theme: 'ta',
					suffix: '',
					s_startDate: $scope.dateObj.s_startDate,
					s_endDate: $scope.dateObj.s_endDate,
					e_startDate: $scope.dateObj.e_startDate,
					e_endDate: $scope.dateObj.e_endDate,
					countPeriod: 1,   // 3:月 2:周 1:日
					isSingle: true,  // true:单时间点 false:开始时间点和结束时间点
					success: function(obj) {
						$scope.$apply(function() {
							$scope.dateObj = obj;
						});
					}
				});
			}
		};
	}

	return directives;
});