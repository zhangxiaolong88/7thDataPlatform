
'use strict';

require.config({
	baseUrl: 'scripts',
	paths: {
		'angular': '../components/angular/angular',
		'ngAnimate': '../components/angular-animate/angular-animate',
		'ngResource': '../components/angular-resource/angular-resource',
		'ngCookies': '../components/angular-cookies/angular-cookies',
		'ngSanitize': '../components/angular-sanitize/angular-sanitize',
		'uiRoute': '../components/angular-ui-router/release/angular-ui-router',
		'uiBootstrap': '../components/angular-bootstrap/ui-bootstrap',
		'uiBootstrapTpls': '../components/angular-bootstrap/ui-bootstrap-tpls',
		'uiSelect': '../components/angular-ui-select2/src/select2',
		'uiTree': '../components/angular-ui-tree/dist/angular-ui-tree',
		'jquery': '../components/jquery/dist/jquery',
		'd3': '../components/d3/d3',
		'underscore': '../components/underscore/underscore'
	},
	shim: {
		'angular': {
			exports: 'angular'
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
		'ngSanitize': {
			deps: ['angular'],
			exports: 'ngSanitize'
		},
		'uiRoute': {
			deps: ['angular'],
			exports: 'uiRoute'
		},
		'uiBootstrap': {
			exports: 'uiBootstrap'
		},
		'uiBootstrapTpls': {
			exports: 'uiBootstrapTpls'
		},
		'uiSelect': {
			exports: 'uiSelect'
		},
		'uiTree': {
			exports: 'uiTree'
		},
		'd3': {
			exports: 'd3'
		},
		'underscore': {
			exports: 'underscore'
		}
	}

});

require(['app'], function(app) {
	app.initialize();
	console.log('Angular app started!');
});