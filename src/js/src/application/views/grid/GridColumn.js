define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!application/views/grid/TemplateColumn.html')
	;

	return Backbone.View.extend({

		template: _.template(Template),

		render: function() {
			var
				styles = this.options.styles
			;

			this.$content = $(this.template());
			this.$content
				.css({
					width: styles.width + styles.widthUnit,
					paddingLeft: styles.padding + styles.paddingUnit,
					paddingRight: styles.padding + styles.paddingUnit
				})
				.appendTo(this.$el);

			return this;
		}
	});
});
