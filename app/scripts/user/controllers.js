'use strict';

define([
	'underscore',
	'./accountController',
	'./authorityController'
],
function(_, acc, atc){
	var controllers = {};
	controllers = _.extend(controllers, acc, atc);

	return controllers;
});