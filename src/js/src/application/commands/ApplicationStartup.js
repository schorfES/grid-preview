define(function(require) {

	var
		$ = require('jquery'),
		GridModel = require('application/models/Grid'),
		GridView = require('application/views/grid/Grid'),
		ConfigView = require('application/views/config/Config'),
		ResizerView = require('application/views/resizer/Resizer'),

		Command = function() {}
	;

	Command.prototype.execute = function() {
		this.createModels();
		this.createViews();
	};

	Command.prototype.createModels = function() {
		var
			gridModel = new GridModel()
		;

		this.context.models = {
			grid: gridModel
		};
	};

	Command.prototype.createViews = function() {
		var
			container = $('.container'),
			header = $('.header .content'),
			settings = this.context.models.grid.toJSON(),
			gridView,
			configView,
			resizerView
		;

		gridView = new GridView({
			el: container,
			settings: settings,
			context: this.context
		}).render();

		configView = new ConfigView({
			el: header,
			settings: settings,
			context: this.context
		}).render();

		resizerView = new ResizerView({
			el: header,
			context: this.context
		}).render();

		this.context.views = {
			grid: gridView,
			config: configView,
			resizer: resizerView
		};
	};

	return Command;

});
