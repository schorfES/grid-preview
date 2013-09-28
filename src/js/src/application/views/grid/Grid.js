define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!application/views/grid/Template.html'),
		GridColumnView = require('application/views/grid/GridColumn')
	;

	return Backbone.View.extend({

		template: _.template(Template),

		initialize: function(options) {
			this.settings = options.settings || {};
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

			if(newSettings.widthMax !== this.settings.widthMax || newSettings.widthMaxUnit !== this.settings.widthUnit || force) {
				this.$content.css({
					maxWidth: newSettings.widthMax + newSettings.widthMaxUnit
				});
			}

			if(newSettings.columns !== this.settings.columns || force) {
				this.clear();
				this.createColumns(newSettings);
			} else if( newSettings.gutter !== this.settings.gutter || newSettings.gutterUnit !== this.settings.gutterUnit) {
				_.each(this.columnViews, function(view) {
					view.applyStyles({
						gutter: newSettings.gutter,
						gutterUnit: newSettings.gutterUnit
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
					gutter: settings.gutter,
					gutterUnit: settings.gutterUnit
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
