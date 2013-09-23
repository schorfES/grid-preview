;(function(window, require) {

	require.config({
		paths: {
			jquery: '../libs/jquery/jquery',
			underscore: '../libs/underscore/underscore',
			backbone: '../libs/backbone/backbone',
			wreqr: '../libs/backbone/backbone.wreqr',
			marionette: '../libs/backbone/backbone.marionette',
			geppetto: '../libs/backbone/backbone.geppetto',
			text: '../libs/require/require.text'
		},

		shim: {
			jquery: {
				exports: '$'
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
			marionette: {
				deps: ['wreqr'],
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
	}

})(window, require);
