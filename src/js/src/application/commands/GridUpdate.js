define(function(require) {

	var
		_ = require('underscore'),
		$ = require('jquery'),
		Command = function() {}
	;

	Command.prototype.execute = function() {
		var
			gridModel = this.context.models.grid,
			gridSettings = gridModel.toJSON(),
			gridView = this.context.views.grid,
			configView = this.context.views.config
		;

		/* There is a difference between $.extend and _.extend. _.extend also
		/* copies properties with value 'undefined' into destination object
		/* which we don't want in this case. */
		$.extend(gridSettings, {
			columns: this.getValidNumberProperty(configView.getColumns()),
			maxWidth: this.getValidNumberProperty(configView.getMaxWidth()),
			maxWidthUnit: this.getValidUnitProperty(configView.getMaxWidthUnit()),
			gutterWidth: this.getValidNumberProperty(configView.getGutterWidth(), true),
			gutterWidthUnit: this.getValidUnitProperty(configView.getGutterWidthUnit())
		});

		gridModel.set(gridSettings);
		gridView.apply(gridSettings);
	};

	Command.prototype.getValidNumberProperty = function(value, includingZero) {
		value = parseFloat(value, 10);
		if(_.isNumber(value) && _.isFinite(value) && !_.isNaN(value)) {
			if(includingZero && value >= 0 || value > 0) {
				return value;
			}
		} else {
			return undefined;
		}
	};

	Command.prototype.getValidUnitProperty = function(value) {
		if(_.isString(value) && (value === '%' || value === 'px')) {
			return value;
		} else {
			return undefined;
		}
	};

	return Command;

});
