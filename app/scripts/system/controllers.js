'use strict';

define([
	'underscore',
	'./loginController',
	'./menuController'
],
function(_, lc, mc){
	var controllers = {};
	controllers = _.extend(controllers, lc, mc);

	return controllers;
});