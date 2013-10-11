define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!application/views/buttonset/TemplateButton.html'),

		defaults = {
			label: 'no label',
			title: 'no title'
		}
	;

	require('jqueryui');

	return Backbone.View.extend({

		template: _.template(Template),

		initialize: function(options) {
			this.options = $.extend({}, defaults, options);
		},

		render: function() {
			this._content = $(this.template(this.options)).appendTo(this.$el);
			this._bindEvents();
			return this;
		},

		_bindEvents: function() {
			_.bindAll(this, '_onClick');
			this._content.find('a').on('click', this._onClick);
		},

		_onClick: function(event) {
			event.preventDefault();
			this.options.context.dispatch(this.options.eventName, {
				button: this,
				originalEvent: event
			});
		}

	});
});
