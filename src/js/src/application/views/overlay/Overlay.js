define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!./Overlay.html'),

		CLASS_OPEN = 'open',
		CLASS_VISIBLE = 'visible',
		CLASS_LOADING = 'loading',

		ANIMATION_DURATION = 600 // A bit more than in css
	;

	return Backbone.View.extend({

		_baseTemplate: _.template(Template),

		render: function() {
			this.$el = $(this._baseTemplate()).appendTo($('body'));

			this._window = $(window);
			this._holder = this.$el.find('> div');
			this._close = this.$el.find('.close');
			this._content = this._renderContent().appendTo(this._holder);

			this._bindEvents();
			this._update();
			return this;
		},

		_renderContent: function() {
			var content = $('<div />').text('Overwrite the "_renderContent()" function.');
			return content;
		},

		_bindEvents: function() {
			_.bindAll(
				this,
				'_onResize',
				'_onClose'
			);

			this._window.on('resize', this._onResize);
			this._close.on('click', this._onClose);
		},

		_unbindEvents: function() {
			this._window.off('resize', this._onResize);
			this._close.off('click', this._onClose);
		},

		open: function() {
			this.$el.addClass(CLASS_OPEN);
			return this;
		},

		close: function() {
			this.$el.removeClass(CLASS_OPEN);
			return this;
		},

		isOpen: function() {
			return this.$el.hasClass(CLASS_OPEN);
		},

		showContent: function() {
			this.$el.addClass(CLASS_VISIBLE);
			return this;
		},

		hideContent: function() {
			this.$el.removeClass(CLASS_VISIBLE);
			return this;
		},

		isVisible: function() {
			return this.$el.hasClass(CLASS_VISIBLE);
		},

		showLoading: function() {
			this.$el.addClass(CLASS_LOADING);
			return this;
		},

		hideLoading: function() {
			this.$el.removeClass(CLASS_LOADING);
			return this;
		},

		isLoading: function() {
			return this.$el.hasClass(CLASS_LOADING);
		},

		destroy: function() {
			if (this.isOpen()) {
				this.close();
			}

			// ToDo: Better use transition end events here:
			window.setTimeout($.proxy(function() {
				this._unbindEvents();
				this.$el.remove();
			}, this), ANIMATION_DURATION);
		},

		_update: function() {
			if (this._content) {
				var
					windowHeight = this._window.height(),
					holderHeight = this._holder.outerHeight()
				;

				this._holder.css({
					marginTop: Math.round((windowHeight - holderHeight) / 2)
				});
			}
		},

		_onResize: function() {
			this._update();
		},

		_onClose: function(event) {
			event.preventDefault();
			this.destroy();
		}

	});
});
