define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!application/views/resizer/Template.html')
	;

	require('jqueryui');

	return Backbone.View.extend({

		template: _.template(Template),

		render: function() {
			_.bindAll(
				this,
				'_onSlide',
				'_onResize'
			);

			this._window = $(window);
			this._content = $(this.template()).appendTo(this.$el);

			this._updateViewport();
			this._renderSliders();

			return this;
		},

		_renderSliders: function() {
			var
				sliders = this._content.find('> div'),
				width = Math.round(this._viewportWidth / 2)
			;

			this._sliderLeft = this._createSlider(sliders.eq(0), width * -1, width * -1, 0);
			this._sliderRight = this._createSlider(sliders.eq(1), width, 0, width);
		},

		_createSlider: function(element, value, min, max) {
			return element.slider({
				value: value,
				min: min,
				max: max,
				slide: this._onSlide,
				stop: this._onSlide
			});
		},

		snapToMax: function() {
			var value = Math.round(this._viewportWidth / 2);
			this._sliderRight.slider('value', value);
			this._sliderLeft.slider('value', value * -1);
		},

		getSelectedWidth: function() {
			return this._sliderRight.slider('value') * 2;
		},

		getSelectedPercentage: function() {
			return this.getSelectedWidth() / this._viewportWidth;
		},

		_updateViewport: function() {
			this._viewportWidth = this._window.width();
		},

		_onSlide: function(event, ui) {
			/* TODO: Decide if ui.handle is one of the sliders
			/* and just change the other: */
			var value = Math.abs(ui.value);
			this._sliderRight.slider('value', value);
			this._sliderLeft.slider('value', value * -1);

			this.options.context.dispatch('resizer:change');
		},

		_onResize: function() {
			this._updateViewport();
		}

	});
});
