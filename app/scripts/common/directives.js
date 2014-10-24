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

	directives.pickDataRange = function() {
		return {
			restrict: "A",
			template: "<div id='div_date' class='date'>" +
				"<span id='date' class='date_title'>2014-05-13 至 2014-06-11</span>" +
				"<a href='javascript:void(0);' id='input_trigger' class='opt_sel'>" +
				"<i class='i_orderd'></i>" +
				"</a>" +
				"</div>",
			transclude: true,
			link: function($scope, $element, $attrs) {
				var dataRange = new pickerDateRange("date", {
					theme: 'ta',
					s_startDate: "2014-09-01",
					s_endDate: "2014-10-01",
					countPeriod: 1,
					isSingle: false,
					success: function(obj) {
						$scope.$apply(function() {
							console.log(obj);
							// $scope.dataRang.sp_startTime = obj.sp_startDate;
							// $scope.dataRang.ep_startTime = obj.ep_endDate;
						});
					}
				});

			}
		};
	}

	return directives;
});