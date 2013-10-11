define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!application/views/buttonset/Template.html'),
		ButtonView = require('application/views/buttonset/Button')
	;

	require('jqueryui');

	return Backbone.View.extend({

		template: _.template(Template),

		initialize: function() {
			if(!_.isObject(this.options.context)) {
				throw new window.Error('Missing context for ButtonsetView.');
			}
		},

		render: function() {
			var
				data = {
					name: this.options.name
				}
			;

			this._content = $(this.template(data)).appendTo(this.$el);
			this._list = this._content.find('ul');
			this._renderButtons();
			return this;
		},

		_renderButtons: function() {
			if(!_.isArray(this.options.buttons)) {
				throw new window.Error('Provide an array of buttons definitions for ButtonsetView.');
			}

			this._buttons = [];
			_.each(this.options.buttons, function(buttonSetup) {
				var
					defaultSetup = {
						el: this._list,
						context: this.options.context
					},
					setup = $.extend(defaultSetup, buttonSetup),
					button = new ButtonView(setup).render()
				;
				this._buttons.push(button);
			}, this);
		}

	});
});
