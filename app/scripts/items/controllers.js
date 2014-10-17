'use strict';

define([
	'underscore',
	'./gameController',
	'./agentController',
	'./areaController',
	'./moduleController'
],
function(_, gc, agc, arc, mc){
	var controllers = {};
	controllers = _.extend(controllers, gc, agc, arc, mc);

	return controllers;
});