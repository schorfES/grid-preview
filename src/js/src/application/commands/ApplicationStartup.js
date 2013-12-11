define(function(require) {

	var
		$ = require('jquery'),
		GridModel = require('application/models/Grid'),
		GridView = require('application/views/grid/Grid'),
		ConfigView = require('application/views/config/Config'),
		ResizerView = require('application/views/resizer/Resizer'),
		ButtonsetView = require('application/views/buttonset/Buttonset'),

		Command = function() {}
	;

	$.extend(Command.prototype, {
		execute: function() {
			this.createModels();
			this.createViews();
		},

		createModels: function() {
			var
				gridModel = new GridModel()
			;

			this.context.models = {
				grid: gridModel
			};
		},

		createViews: function() {
			var
				container = $('.container'),
				header = $('.header .content'),
				settings = this.context.models.grid.toJSON(),
				gridView,
				configView,
				resizerView,
				metanavigationView,
				featuresView
			;

			gridView = new GridView({
				el: container,
				settings: settings,
				context: this.context
			}).render();

			metanavigationView = new ButtonsetView({
				el: header,
				name: 'metanavigation',
				context: this.context,
				buttons: [
					{
						name: 'github',
						label: 'GitHub',
						title: 'View source on Github',
						eventName: 'click:github'
					}
				]
			}).render();

			featuresView = new ButtonsetView({
				el: header,
				name: 'features',
				context: this.context,
				buttons: []
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
				resizer: resizerView,
				metanavigation: metanavigationView,
				features: featuresView
			};
		}
	});

	return Command;
});
