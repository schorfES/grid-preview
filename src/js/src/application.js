;(function(window, require) {

	require.config({
		paths: {
			jquery: '../libs/jquery/jquery',
			uniform: '../libs/jquery/jquery.uniform',
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
			uniform: {
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
			'core/application/ApplicationFactory',
			'application/Context'
		],
		initialize
	);

	function initialize(ApplicationFactory, Context) {
		var app = ApplicationFactory.getApplication('grid-preview');

		app.addInitializer(function() {
			app.context = new Context({
				application: app
			});
			app.context.dispatch('application:start');
		});

		app.start();

		//Add to global
		window.gridPreview = app;
	}

})(window, require);
