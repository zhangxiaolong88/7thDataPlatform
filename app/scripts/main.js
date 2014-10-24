
'use strict';

require.config({
	baseUrl: 'scripts',
	paths: {
		'angular': '../components/angular/angular',
		'ngRoute': '../components/angular-route/angular-route',
		'ngAnimate': '../components/angular-animate/angular-animate',
		'ngResource': '../components/angular-resource/angular-resource',
		'ngCookies': '../components/angular-cookies/angular-cookies',
		'uiRoute': '../components/angular-ui-router/release/angular-ui-router',
		'uiBootstrap': '../components/angular-bootstrap/ui-bootstrap',
		'uiBootstrapTpls': '../components/angular-bootstrap/ui-bootstrap-tpls',
		'd3': '../components/d3/d3',
		'underscore': '../components/underscore/underscore',
		'jquery': '../components/jquery/dist/jquery',
		'select2': '../components/select2/select2.min',
		'pickDataRange': '../components/pickDataRange/pickDataRange'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'ngRoute': {
			deps: ['angular'],
			exports: 'ngRoute'
		},
		'ngAnimate': {
			deps: ['angular'],
			exports: 'ngAnimate'
		},
		'ngResource': {
			deps: ['angular'],
			exports: 'ngResource'
		},
		'ngCookies': {
			deps: ['angular'],
			exports: 'ngCookies'
		},
		'uiRoute': {
			deps: ['angular'],
			exports: 'uiRoute'
		},
		'uiBootstrap': {
			deps: ['angular'],
			exports: 'uiBootstrap'
		},
		'uiBootstrapTpls': {
			deps: ['uiBootstrap'],
			exports: 'uiBootstrapTpls'
		},
		'd3': {
			exports: 'd3'
		},
		'underscore': {
			exports: 'underscore'
		},
		'jquery': {
			exports: '$'
		},
		'select2': {
			deps: ['jquery'],
			exports: 'select2'
		},
		'pickDataRange': {
			deps: ['jquery'],
			exports: 'pickDataRange'
		}
	}

});

require(['app'], function(app) {
	app.initialize();
	console.log('Angular app started!');
});