define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!application/views/grid/Template.html'),
		GridColumnView = require('application/views/grid/GridColumn'),

		defaults = {
			columns: 12,
			widthUnit: '%',
			padding: 10,
			paddingUnit: 'px'
		}
	;

	return Backbone.View.extend({

		template: _.template(Template),

		initialize: function(options) {
			options.settings = options.settings || {};
			this.settings = $.extend({}, defaults, options.settings);
		},

		render: function() {
			this.$content = $(this.template()).appendTo(this.$el);
			this.apply(this.settings, true);
			return this;
		},

		clear: function() {
			this.$content
				.children()
				.remove();

			this.columnViews = [];
		},

		apply: function(settings, force) {
			var newSettings = $.extend({}, this.settings, settings);

			if(newSettings.columns !== this.settings.columns || force) {
				this.clear();
				this.createColumns(newSettings);
			} else if( newSettings.padding !== this.settings.padding || newSettings.paddingUnit !== this.settings.paddingUnit) {
				_.each(this.columnViews, function(view) {
					view.applyStyles({
						padding: newSettings.padding,
						paddingUnit: newSettings.paddingUnit
					});
				});
			}

			this.settings = newSettings;
		},

		createColumns: function(settings) {
			var
				styles = {
					width: 1/settings.columns * 100,
					widthUnit: settings.widthUnit,
					padding: settings.padding,
					paddingUnit: settings.paddingUnit
				},
				view,
				index
			;

			for(index = 0; index < settings.columns; index++) {
				view = new GridColumnView({
					el: this.$content,
					styles: styles,
					index: index
				}).render();

				this.columnViews.push(view);
			}
		}

	});
});
