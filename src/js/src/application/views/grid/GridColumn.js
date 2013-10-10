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
			this.$content = $(this.template()).appendTo(this.$el);
			this.applyStyles(this.options.styles);

			return this;
		},

		applyStyles: function(styles) {
			this.options.styles = styles;
			this.$content
				.css({
					width: styles.width + styles.widthUnit,
					paddingLeft: styles.gutterWidth + styles.gutterWidthUnit,
					paddingRight: styles.gutterWidth + styles.gutterWidthUnit
				});

			return this;
		}
	});
});
