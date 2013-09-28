define(function(require) {

	var
		$ = require('jquery'),
		GridView = require('application/views/grid/Grid'),
		Command = function() {}
	;

	Command.prototype.execute = function() {
		this.createViews();
	};

	Command.prototype.createViews = function() {
		var
			container = $('.container'),
			gridView
		;

		gridView = new GridView({
			el: container,
			settings: {
				columns: 6,
				padding: 2.4,
				paddingUnit: '%'
			}
		}).render();

		this.context.views = {
			grid: gridView
		};
	};

	return Command;

});
