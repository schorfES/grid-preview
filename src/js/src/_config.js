/* This is a requirejs configuration file which is loaded by requirejs in the
/* browser or by gruntjs to define the build task.
/*
/* Defines a module that works in Node and AMD.
/* Taken from https://github.com/umdjs/umd/blob/master/nodeAdapter.js */

// Help Node out by setting up define:
if (typeof module === 'object' && typeof define !== 'function') {
	var define = function (factory) {
		module.exports = factory();
	};
}

define(function () {
	return {
		paths: {
			jquery: '../libs/jquery/jquery',
			jqueryui: '../libs/jquery/jquery.ui.custom',
			jqueryuniform: '../libs/jquery/jquery.uniform',
			underscore: '../libs/underscore/underscore',
			backbone: '../libs/backbone/backbone',
			wreqr: '../libs/backbone/backbone.wreqr',
			babysitter: '../libs/backbone/backbone.babysitter',
			marionette: '../libs/backbone/backbone.marionette',
			geppetto: '../libs/backbone/backbone.geppetto',
			text: '../libs/require/require.text'
		},

		shim: {
			jquery: {
				exports: '$'
			},
			jqueryui: {
				deps: ['jquery'],
				exports: '$.fn.ui'
			},
			jqueryuniform: {
				deps: ['jquery'],
				exports: '$.fn.uniform'
			},
			underscore: {
				exports: '_'
			},
			backbone: {
				deps: ['underscore', 'jquery'],
				exports: 'Backbone'
			},
			wreqr: {
				deps: ['backbone'],
				exports: 'Backbone.Wreqr'
			},
			babysitter: {
				deps: ['backbone'],
				exports: 'Backbone.BabySitter'
			},
			marionette: {
				deps: ['wreqr', 'babysitter'],
				exports: 'Backbone.Marionette'
			},
			geppetto: {
				deps: ['marionette'],
				exports: 'Backbone.Geppetto'
			}
		}
	};
});
