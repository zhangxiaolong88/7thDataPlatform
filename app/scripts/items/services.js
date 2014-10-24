'use strict';

define([
	'underscore',
	'./gameService',
	'./agentService',
	'./areaService',
	'./moduleService'
],
function(_, gs, ags, ars, ms){
	var services = {};
	services = _.extend(services, gs, ags, ars, ms);

	return services;
});