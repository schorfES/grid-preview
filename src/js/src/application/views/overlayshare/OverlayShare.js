define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		OverlayView = require('application/views/overlay/Overlay'),
		Template = require('text!./OverlayShare.html')
	;

	return OverlayView.extend({

		_templateContent: _.template(Template),

		_renderContent: function() {
			var content = $(this._templateContent());
			this._input = content.find('input');
			return content;
		},

		_bindEvents: function() {
			// Call super:
			OverlayView.prototype._bindEvents.apply(this, arguments);

			_.bindAll(
				this,
				'_onInput'
			);

			this._input.on('input', this._onInput);
		},

		_unbindEvents: function() {
			// Call super:
			OverlayView.prototype._unbindEvents.apply(this, arguments);

			this._input.on('click', this._onClickInput);
		},

		setUrl: function(url) {
			this._url = url;
			this._input.val(url);
			return this;
		},

		_onInput: function() {
			this._input.val(this._url);
		}

	});
});
