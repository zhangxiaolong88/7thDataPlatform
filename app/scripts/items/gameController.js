'use strict';

/* Controllers */
define(['jquery', 'select2', 'pickDataRange'], function($) {
	var controllersObj = {};

	controllersObj.gameController = ['$scope', 'gameService',
		function($scope, gameService) {

			// 查询结果
			$scope.games = [];
			// 分页参数
			$scope.pageObj = {
				pageCount: 10,  // 每页几条
				currentPage: 1, // 现在在第几页
				totalCount: 0,  // 一共多少条
				totalPage: 0    // 一共多少页
			};
			// 一共多少页的数组
			$scope.pages = [];
			// 是否全选
			$scope.allChecked = false;
			// 数据表格模型
			$scope.tableIndex = [{
				name: "序号",
				sort: 0
			}, {
				name: "游戏名称",
				sort: 2
			}, {
				name: "游戏编号",
				sort: 2
			}, {
				name: "游戏描述",
				sort: 2
			}];
			// 时间段查询参数
			$scope.dataRang = {
				sp_startTime: "2014-01-01",
				sp_endTime: "2014-01-01",
				ep_startTime: "2014-01-01",
				ep_endTime: "2014-01-01"
			};

			// 每一行的checkbox点击事件
			$scope.check = function(currentGame) {
				currentGame.checked = !currentGame.checked;
				var all = true;
				for (var game in $scope.games) {
					if ($scope.games[game].checked === false) {
						all = false;
					}
				}
				$scope.allChecked = all;
			};

			// 全选的checkbox的点击事件
			$scope.allCheck = function() {
				$scope.allChecked = !$scope.allChecked;
				for (var game in $scope.games) {
					if ($scope.allChecked === true) {
						$scope.games[game].checked = true;
					} else {
						$scope.games[game].checked = false;
					}
				}
			};

			// 取分页数据
			$scope.getData = function(page) {
				$scope.pageObj.currentPage = page;
				getGames({
					pageCount: $scope.pageObj.pageCount,
					currentPage: $scope.pageObj.currentPage
				});
			};

			// 排序
			$scope.sortTab = function(th) {
				for (var tab in $scope.tableIndex) {
					if (th.name != $scope.tableIndex[tab].name) {
						$scope.tableIndex[tab].sort = 2;
					}
				}

				if (th.sort == 0) {
					th.sort = 1;
				} else if (th.sort == 1) {
					th.sort = 0;
				} else if (th.sort == 2) {
					th.sort = 0;
				}

				getGames({
					pageCount: $scope.pageObj.pageCount,
					currentPage: $scope.pageObj.currentPage
				});

			};

			var getGames = function(data) {
				gameService.getGames(data).success(function(result) {
					$scope.games = result.data.games;
					$scope.pageObj.totalCount = result.data.totalCount;
					$scope.pageObj.totalPage = Math.ceil($scope.pageObj.totalCount / $scope.pageObj.pageCount);

					// 初始化翻页个数对象
					$scope.pages = [];
					for (var i = 1; i <= $scope.pageObj.totalPage; i++) {
						$scope.pages.push(i);
					}

					// 初始化序号 取消所有已选项
					var sortNumber = ($scope.pageObj.currentPage - 1) * $scope.pageObj.pageCount + 1;
					for (var j = 0; j < $scope.games.length; j++) {
						$scope.games[j].sortNumber = sortNumber + j;
						$scope.games[j].checked = false;
					}
				});
			};

			getGames({
				pageCount: 10,
				currentPage: 1
			});
		}
	];

	return controllersObj;
});