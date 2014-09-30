'use strict';
/* Services */
define([], function() {
	var services= {};

	services.GlobalConfig = function(){
		return {
			highcharts:{
				colors:['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
				fontFamily:"'Cuprum', sans-serif",
				fontColor:"#ffffff",
				lineColor:"#4d5358"
			}
		};
	};

	return services;
});