define(function(require) {

	var
		$ = require('jquery'),
		_ = require('underscore'),

		Command = function() {}
	;

	$.extend(Command.prototype, {
		execute: function() {
			var
				gridModel = this.context.models.grid,
				gridSettings = gridModel.toJSON(),
				gridView = this.context.views.grid,
				configView = this.context.views.config,
				resizerView = this.context.views.resizer
			;

			/* There is a difference between $.extend and _.extend. _.extend also
			/* copies properties with value 'undefined' into destination object
			/* which we don't want in this case. */
			// Clone values from ConfigView:
			$.extend(gridSettings, {
				columns: this.getValidNumberProperty(configView.getColumns()),
				maxWidth: this.getValidNumberProperty(configView.getMaxWidth()),
				maxWidthUnit: this.getValidUnitProperty(configView.getMaxWidthUnit()),
				gutterWidth: this.getValidNumberProperty(configView.getGutterWidth(), true),
				gutterWidthUnit: this.getValidUnitProperty(configView.getGutterWidthUnit())
			});

			// Crop grid's viewport by given setting from resizer:
			if (resizerView.getSelectedPercentage() > 0.95) {
				gridView.crop(100, '%');
				resizerView.snapToMax();
			} else {
				gridView.crop(resizerView.getSelectedWidth(), 'px');
			}

			// Store all values in model and update view:
			gridModel.set(gridSettings);
			gridView.apply(gridSettings);
		},

		getValidNumberProperty: function(value, includingZero) {
			value = parseFloat(value, 10);
			if (_.isNumber(value) && _.isFinite(value) && !_.isNaN(value)) {
				if (includingZero && value >= 0 || value > 0) {
					return value;
				}
			} else {
				return undefined;
			}
		},

		getValidUnitProperty: function(value) {
			if (_.isString(value) && (value === '%' || value === 'px')) {
				return value;
			} else {
				return undefined;
			}
		}
	});

	return Command;
});
