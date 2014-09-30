'use strict';

/* Directives */
define(['jquery'], function(jQuery) {
	var directives = {};
	directives.mydirective = function() {
		return {
			restrict: "EA",
			template: "<strong>myDirective</strong>",
			replace: true
		};
	};
	directives.appVersion = function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	};
	//处理浏览器自动填充问题(无效)
	directives.browserAutocompelteForm = function() {
        return {
            priority: 10,
            link: function(scope, element, attrs) {
                element.on('submit', function (ev) {
                	alert(11);
                    jQuery('input[ng-model]', element).each(function (index, item) {
                        if (angular.element(this).attr('type') !== 'checkbox' && angular.element(this).attr('type') !== 'radio') {
                            angular.element(this).controller('ngModel').$setViewValue(jQuery(this).val());
                        }
                    });
                });
            }
        };
    };
	//loading图标
	directives.loading = function() {
		return {
			scope: {
				state: '='
			},
			compile: function(tElement, tAttrs, transclude) {
				tElement.css({
					'position': 'relative'
				}).append('<div class="loadingMask"><img src="images/loading.gif">使劲加载...</div>');
				return function link(scope, iElement, iAttrs, controller) {
					scope.$watch('state', function(newVal, oldVal) {
						if (newVal) {
							iElement.find('.loadingMask').fadeIn();
						} else {
							iElement.find('.loadingMask').fadeOut();
						}
					});
				};
			}
		};
	};

	//highcharts
	directives.chart = function() {
		return {
			restrict: 'EA',
			template: '<div></div>',
			scope: {
				chartData: "=value"
			},
			transclude: true,
			replace: true,
			link: function($scope, $element, $attrs) {
				//Update when charts data changes
				$scope.$watch('chartData', function(value) {
					if (!value)
						return;

					// use default values if nothing is specified in the given settings
					$scope.chartData.chart = $scope.chartData.chart || {};
					if ($attrs.type)
						$scope.chartData.chart.type = $scope.chartData.chart.type || $attrs.type;
					if ($attrs.height)
						$scope.chartData.chart.height = $scope.chartData.chart.height || $attrs.height;
					if ($attrs.width)
						$scope.chartData.chart.width = $scope.chartData.chart.width || $attrs.width;

					if ($attrs.type == "map") {
						$($element).highcharts('Map', $scope.chartData);
					} else {
						$($element).highcharts($scope.chartData);
					}
				});
			}
		};
	};
	//数据表
	directives.datatable = ['$timeout',
		function($timeout) {
			return {
				restrict: "EA",
				scope: {
					data: '=data',
					fixHead: '@',
					scrollElem: '@',
					search: '@',
					showPageSize: '@'
				},
				template: '<div class="datatable">'+
		                '<div class="dataTables_wrapper">'+
		                    '<div class="datatable-header" ng-show="search || showPageSize">'+
		                        '<div class="dataTables_filter" ng-show="search">'+
		                            '<label>'+
		                                '<span>搜索:</span>'+
		                                '<input ng-model="search_key" type="text" placeholder="输入关键字" >'+
		                                '</label>'+
		                        '</div>'+
		                        '<div class="dataTables_length" ng-show="showPageSize">'+
		                            '<label class="com_select">'+
		                                '<span class="com_select_lbl">显示条目：</span>'+
		                                '<div class="com_select_container">'+
		                                    '<a class="com_select_current" ng-class="{open:!com_select_isCollapse}" href="javascript:void(0);" ng-click="com_select_isCollapse=!com_select_isCollapse">{{perPage}}</a>'+
		                                    '<ul class="com_select_list" ng-init="com_select_isCollapse=true;" collapse="com_select_isCollapse">'+
		                                        '<li><a href ng-click="pageSizeChanged(10);" ng-class="{active:perPage==10}">10</a></li>'+
		                                        '<li><a href ng-click="pageSizeChanged(20);" ng-class="{active:perPage==20}">20</a></li>'+
		                                        '<li><a href ng-click="pageSizeChanged(30);" ng-class="{active:perPage==30}">30</a></li>'+
		                                        '<li><a href ng-click="pageSizeChanged(50);" ng-class="{active:perPage==50}">50</a></li>'+
		                                    '</ul>'+
		                                '</div>'+
		                            '</label>'+
		                        '</div>'+
		                    '</div>'+
		                    '<div class="datatable-scroll">'+
		                        '<table class="table table-hover table-bordered" ng-class="{dataTable: search || showPageSize}">'+
		                            '<thead>'+
		                                '<tr role="row">'+
		                                    '<th ng-repeat="header in data.headers" column-index="{{$index}}" ng-class="{sorting:header.sort,sorting_both:(!header.sortState || header.sortState == -1),sorting_desc:(header.sortState==2),sorting_asc:(header.sortState==1)}" ng-click="sort($index)">{{header.name}}</th>' +
		                                '</tr>'+
		                            '</thead>'+
		                            '<tbody>'+
		                            	'<tr class="{odd:$index%2}" ng-repeat="data in currentData | filter:search_key">' + 
		                            		'<td ng-repeat="row in data">{{row}}</td>' + 
		                            	'</tr>' + 
		                            '</tbody>'+
		                        '</table>'+
		                    '</div>'+
		                    '<div class="datatable-footer">'+
		                        '<div class="dataTables_info">'+
		                        '{{(currentPage-1)*perPage+1}} - '+
		                        '<span ng-if="currentPage*perPage <= totalItems">{{currentPage*perPage}}</span>'+
		                        '<span ng-if="currentPage*perPage > totalItems">{{totalItems}}</span>'+
		                        ' | 共 {{totalItems}} 记录</div>'+
		                        '<div class="dataTables_paginate paging_full_numbers">'+
		                        	'<pagination total-items="totalItems" ng-model="currentPage" ng-change="pageChanged()"' +
					'previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"' +
					'items-per-page="perPage" num-pages="numPages"></pagination>' +
		                        '</div>'+
		                    '</div>'+
		                '</div>'+
            		'</div>',
				link: function(scope, element, attrs) {
					var data = scope.data;

					scope.totalItems = data.datas.length;
					scope.perPage = 10;
					scope.currentPage = 1;

					scope.pageChanged = function() {
						var startIndex = (scope.currentPage - 1) * scope.perPage;
						var endIndex = startIndex + scope.perPage;
						scope.currentData = scope.data.datas.slice(startIndex, endIndex);
					}
					scope.pageChanged();

					scope.pageSizeChanged = function(v){
						scope.com_select_isCollapse = true;
						if(scope.perPage == v) {
							return
						};
						scope.perPage = v;
						scope.currentPage = 1;
						scope.pageChanged();
					}

					scope.sort = function(index) {
						if (data.headers[index].sort) {
							data.headers[index].sortState = data.headers[index].sortState || -1;
							switch (data.headers[index].sortState) {
								case 1: //asc
									data.datas = data.datas.sort(function(a, b) {
										return b[index] - a[index];
									});
									dealSortState(index, 2);
									break;
								case 2: //desc
								case -1: //both
									data.datas = data.datas.sort(function(a, b) {
										return a[index] - b[index];
									});
									dealSortState(index, 1);
									break;
							}

							scope.currentPage = 1;
							scope.pageChanged();
						}
					}

					function dealSortState(index, state) {
						for (var i = 0; i < scope.data.headers.length; i++) {
							scope.data.headers[i].sortState = -1;
						}

						scope.data.headers[index].sortState = state;
					}
					if (scope.fixHead) {
						var timer;
						var scrollElem = scope.scrollElem || "body";
						$(scrollElem).on('scroll', function() {
							if (timer) $timeout.cancel(timer);
							var tableTop = $(element).offset().top;
							timer = $timeout(function() {
								var sTop = $(".pl-content-right").scrollTop();
								var cloneThead = $("#cloneThead");

								if (tableTop < 0) {

									if (!cloneThead.length) {
										var cloneElem = $(element).find("thead").clone();

										$.each($(element).find('th'), function(k, v) {
											var w = $(this).outerWidth();
											cloneElem.find('th:eq(' + k + ')').css({
												width: w
											});
										});

										$("body").append("<div id='cloneThead' class='datatable'><table class='table table-bordered'></table></div>");
										$("#cloneThead table").append(cloneElem).css({
											width: $(element).width(),
											position: 'absolute',
											left: $(element).offset().left,
											top: 0
										});
									} else {
										cloneThead.show();
									}
								} else {
									if (cloneThead.length) {
										cloneThead.hide();
									}
								}

							}, 100);
						});
					}
				}
			}
		}
	];
	//挂件
	directives.widget = function() {
		return {
			restrict: 'EA',
			scope: {
				tilte: '@'
			},
			replace: true,
			transclude: true,
			template: '<div class="widget">' + '<div class="widget-head">' + '<i class="ico pull-left fa fa-tasks"></i>' + '<h4 class="title pull-left">{{tilte}}</h4>' +
			// '<span class="pull-right"><a class="widget-close"><i class="fa fa-times"></i></a></span>' + 
			'</div>' + '<div class="widget-wrap" ng-transclude>' + '</div>' + '</div>'
		};
	};

	//滑动容器
	directives.slideWrapper = ['$timeout',function($timeout){
		return {
			restrict: 'EA',
			scope: {
				data: '=',
				style:"=",
				currentIndex:'='
			},
			replace: true,
			transclude: true,
			templateUrl:"../../views/directivesTpl/slide.html",
			link: function($scope, $element, $attrs) {
				
				//修改选中项
				$scope.changes = function(index){
					$scope.currentIndex = index;
				}
				
				
				if(!!(jQuery(window).width() <= 767)) return;//手机

				$scope.currentIndex = 0;
				var widgetWidth,outterW,innerW;

				var init = function(){

					widgetWidth = 99;
					outterW = parseInt($scope.style.width) - 40;//30padding
					innerW = widgetWidth * $scope.data.length - 10;//减去最右边的margin-right
					$scope.innerContainerWidth = {
						width : innerW + "px",
						'margin-left':0
					};
					
					//初始判断是否显示右边边按钮
					$scope.isSlide = innerW > outterW
					$scope.isLeftmost = !$scope.isSlide;
					$scope.isRightmost = $scope.isSlide;
				}

				$scope.$watchCollection(function(){
					return $scope.style;
				},function(){
					init();
				});
				

				//向左滑动
				$scope.btnLeft = function(){
					var ml = parseInt($scope.innerContainerWidth["margin-left"]) - outterW + "px";
					$scope.isLeftmost = (innerW - (- parseInt(ml) + outterW) < 0) || (innerW - (- parseInt(ml) + outterW) < widgetWidth);
					$scope.innerContainerWidth["margin-left"] = $scope.isLeftmost ? "-"+(innerW - outterW)+"px" : ml;
					$scope.isRightmost = parseInt($scope.innerContainerWidth["margin-left"]) == 0;
				}

				//向右滑动
				$scope.btnRight = function(){
					var ml = parseInt($scope.innerContainerWidth["margin-left"]) + outterW + "px";
					$scope.innerContainerWidth["margin-left"] = !(!(parseInt(ml) > 0 || -parseInt(ml) < widgetWidth)) ? 0 : ml;
					$scope.isRightmost = parseInt($scope.innerContainerWidth["margin-left"]) == 0;
					$scope.isLeftmost = parseInt($scope.innerContainerWidth["margin-left"]) == - innerW + outterW;
				}

				
			}
		};
	}];

	return directives;
});