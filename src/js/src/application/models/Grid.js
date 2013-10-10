define(function(require) {

	var
		Backbone = require('backbone')
	;

	return Backbone.Model.extend({
		defaults: {
			fluid: true,
			columns: 12,
			widthUnit: '%',
			maxWidth: 960,
			maxWidthUnit: 'px',
			gutterWidth: 2.4,
			gutterWidthUnit: '%'
		}
	});

});
