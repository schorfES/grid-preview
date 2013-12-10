;(function(window, require) {

	require.config({
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
	});

	require(
		[
			'core/application/Application',
			'application/Context'
		],
		initialize
	);

	function initialize(Application, Context) {
		var app = new Application(Context);
		app.start();

		//Add to global name space:
		window.gridPreview = app;
	}

})(window, require);
