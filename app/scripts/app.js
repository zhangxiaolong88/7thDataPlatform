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
  'ngCookies'
], function(angular, services, directives, filters, controllers) {

  var initialize = function() {
    var app = angular.module('7thDataPlatformApp', ['ui.router', 'ngResource','ui.bootstrap','ngAnimate','ngCookies']);
  
    // 常量
    app.constant('BASEPATH', 'http://localhost:9000');

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