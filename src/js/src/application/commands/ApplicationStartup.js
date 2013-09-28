define(function(require) {

	var
		$ = require('jquery'),
		GridModel = require('application/models/Grid'),
		GridView = require('application/views/grid/Grid'),
		ConfigView = require('application/views/config/Config'),

		Command = function() {}
	;

	Command.prototype.execute = function() {
		this.createModels();
		this.createViews();
	};

	Command.prototype.createModels = function() {
		var
			gridModel = new GridModel();
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
			configView
		;

		gridView = new GridView({
			el: container,
			settings: settings
		}).render();

		configView = new ConfigView({
			el: header,
			settings: settings
		}).render();

		this.context.views = {
			grid: gridView,
			config: configView
		};
	};

	return Command;

});
