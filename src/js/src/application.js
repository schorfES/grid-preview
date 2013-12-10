;(function(window, require) {
	require(['_config'], function(config) {
		require.config(config);
		require(
			['core/application/Application', 'application/Context'],
			initialize
		);
	});

	function initialize(Application, Context) {
		var app = new Application(Context);
		app.start();

		//Add to global name space:
		window.gridPreview = app;
	}

})(window, require);
