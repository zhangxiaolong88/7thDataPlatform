'use strict';

define([
  'angular',
  'register/services',
  'register/directives',
  'register/filters',
  'register/controllers',
  'ngResource',
  'uiRoute',
  'uiBootstrapTpls',
  'uiBootstrap',
  'ngAnimate',
  'ngCookies',
  'ngRoute'
], function(angular, services, directives, filters, controllers) {

  var initialize = function() {
    var app = angular.module('7thDataPlatformApp', ['ngResource', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngCookies', 'ngRoute'])
      .run(['$rootScope', '$location', '$state', 'loginService',
        function($rootScope, $location, $state, loginService) {
          $rootScope.$on("$locationChangeStart", function(event, next, current) {
            // 如果直接访问登录页面，则不验证登录。否则每次变更路由都要验证登录
            if (next.split("#")[1] !== "/login") {
              loginService.checkLogin().success(function(result) {
                if (result.status === 0) {
                  $state.go("login");
                }
              });
            }

          });
        }
      ]);

    // 常量
    app.constant('BASEPATH', 'http://localhost:9001');

    // 注册 （注意这里的顺序）
    services.initialize(app);
    directives.initialize(app);
    filters.initialize(app);
    controllers.initialize(app);
    console.log("Angular compiled and executed.");

    // 渲染
    angular.bootstrap(window.document, ["7thDataPlatformApp"]);
  };

  return {
    initialize: initialize
  };
});