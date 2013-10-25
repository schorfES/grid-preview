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
			this._content = $(this.template()).appendTo(this.$el);
			this._grid = this._content.find('.grid');
			this.apply(this.settings, true);
			return this;
		},

		clear: function() {
			this._grid
				.children()
				.remove();

			this.columnViews = [];
		},

		apply: function(settings, force) {
			var newSettings = $.extend({}, this.settings, settings);

			if (newSettings.maxWidth !== this.settings.maxWidth || newSettings.maxWidthUnit !== this.settings.maxWidthUnit || force) {
				this._grid.css({
					maxWidth: newSettings.maxWidth + newSettings.maxWidthUnit
				});
			}

			if (newSettings.columns !== this.settings.columns || force) {
				this.clear();
				this._createColumns(newSettings);
			} else if (newSettings.gutterWidth !== this.settings.gutterWidth || newSettings.gutterWidthUnit !== this.settings.gutterWidthUnit) {
				_.each(this.columnViews, function(view) {
					view.applyStyles({
						gutterWidth: newSettings.gutterWidth,
						gutterWidthUnit: newSettings.gutterWidthUnit
					});
				});
			}

			this.settings = newSettings;
		},

		crop: function(width, unit) {
			this._content.css({
				maxWidth: width + unit
			});
		},

		_createColumns: function(settings) {
			var
				styles = {
					width: 1 / settings.columns * 100,
					widthUnit: settings.widthUnit,
					gutterWidth: settings.gutterWidth,
					gutterWidthUnit: settings.gutterWidthUnit
				},
				view,
				index
			;

			for (index = 0; index < settings.columns; index++) {
				view = new GridColumnView({
					el: this._grid,
					styles: styles,
					index: index
				}).render();

				this.columnViews.push(view);
			}
		}

	});
});
