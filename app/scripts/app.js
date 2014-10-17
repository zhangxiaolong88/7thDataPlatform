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
      .run(['$rootScope', '$location',
        function($rootScope, $location) {
          $rootScope.$on("$routeChangeStart", function(event, next, current) {
            console.log(11);
            // if (!Auth.authorize(next.access)) {
            //   if (Auth.isLoggedIn()) $location.path('/');
            //   else $location.path('/login');
            // }
          });
          $rootScope.$on('$routeChangeSuccess', function(next, last) {
            console.log("Navigating from ", last);
            console.log("Navigating to ", next);
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