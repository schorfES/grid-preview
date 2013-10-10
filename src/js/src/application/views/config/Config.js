define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!application/views/config/Template.html')
	;

	require('uniform');

	return Backbone.View.extend({

		template: _.template(Template),

		render: function() {
			this.$content = $(this.template(this.options.settings)).appendTo(this.$el);
			this.$content.find('select').uniform({
				selectClass: 'select',
				selectAutoWidth: false
			});
			return this;
		}

	});
});
