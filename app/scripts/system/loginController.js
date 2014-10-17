'use strict';

/* Controllers */
define(['routers/routers'], function(routers) {
	var controllersObj = {};

	//登录控制器
	controllersObj.loginController = ['$scope', '$state', 'loginService',
		function($scope, $state, loginService) {

			// 空白默认
			$scope.phUserName = '用户名';
			$scope.phPassword = '密  码';

			// 记住我
			$scope.rememberMe = false;

			// 错误信息
			$scope.resultFail = false;

			// 是否提交
			$scope.submitted = false;

			// 如果本地有用户信息 则默认为登录信息
			if (localStorage.getItem("userName")) $scope.userName = localStorage.getItem("userName");
			if (localStorage.getItem("password")) $scope.password = localStorage.getItem("password");

			// 登录事件
			$scope.loginSubmit = function() {
				// 每次登录时 默认错误信息不出现
				$scope.resultFail = false;

				// 如果表单验证有效
				if ($scope.loginForm.$valid) {
					// 登录请求
					loginService.login({
						userName: $scope.userName,
						password: $scope.password
					}).success(function(result) {
						if (result.state == 1) {
							// 如果用户选择了记住我 则将用户信息存储至本地
							if ($scope.rememberMe === true) {
								localStorage.setItem("userName", $scope.userName);
								localStorage.setItem("password", $scope.password);
							} else {
								// 删除本地的用户信息
								localStorage.removeItem("userName");
								localStorage.removeItem("password");
							}

							// 跳转默认模块
							$state.go("main.game");
						} else {
							$scope.resultFail = true;
						}

					}).error(function(err) {
						console.log(err);
					});
				} else {
					// 点击登录且表单未通过 则显示提示错误信息
					$scope.submitted = true;
				}
			};

		}
	];


	return controllersObj;
});