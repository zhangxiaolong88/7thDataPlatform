'use strict';

define([
	'underscore',
	'./demoController',
	'./tablesController',
	'./fiveForceController'
],
function(_,demoCT,tableCt,ffCT){
	var controllers = {};
	controllers = _.extend(controllers, demoCT, tableCt, ffCT);

	return controllers;
});