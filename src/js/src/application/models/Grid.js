define(function(require) {

	var
		Backbone = require('backbone')
	;

	return Backbone.Model.extend({
		defaults: {
			fluid: true,
			columns: 12,
			widthUnit: '%',
			widthMax: 960,
			widthMaxUnit: 'px',
			gutterWidth: 2.4,
			gutterWidthUnit: '%'
		}
	});

});
