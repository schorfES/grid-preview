define(function(require) {

	var
		$ = require('jquery'),
		OverlayView = require('application/views/overlayshare/OverlayShare'),

		Command = function() {},
		API_SOURCE = 'https://apis.google.com/js/client.js'
	;

	$.extend(Command.prototype, {

		execute: function() {
			this._createOverlay();

			if (this._hasAPI()) {
				this._getShortUrl();
			} else {
				this._getAPI();
			}
		},

		_hasAPI: function() {
			return window.gapi &&
				window.gapi.client &&
				window.gapi.client.urlshortener &&
				window.gapi.client.urlshortener.url &&
				typeof window.gapi.client.urlshortener.url.insert === 'function';
		},

		_getAPI: function() {
			// Define callback:
			this._callbackName = 'cb' + (new Date()).getTime();
			this._callback = window[this._callbackName] = $.proxy(this._onAPILoad, this);

			// Append callbackname to API source:
			$.getScript(API_SOURCE + '?onload=' + this._callbackName);
		},

		_getShortUrl: function() {
			var request = window.gapi.client.urlshortener.url.insert({
				resource: {
					longUrl: window.location.href
				}
			});

			request.execute($.proxy(this._onAPIReceive, this));
		},

		_createOverlay: function() {
			if (!this._overlay) {
				this._overlay = new OverlayView({
					context: this.context
				}).render().open().showLoading();
			}
		},

		_onAPILoad: function() {
			// Remove all registered references for callback of API:
			var name = this._callbackName;
			this._callback = undefined;
			this._callbackName = undefined;
			window[name] = undefined;
			delete(this._callback);
			delete(this._callbackName);
			delete(window[name]);

			// INFO: We didn't set an API key currently as expected.
			// The requests are limited...

			// Load the v1 version of the API for the urlshortener service:
			window.gapi.client.load(
				'urlshortener', 'v1',
				$.proxy(this.execute, this)
			);
		},

		_onAPIReceive: function(response) {
			if (response.id) {
				this._overlay
					.setUrl(response.id)
					.hideLoading()
					.showContent();
			}
		}
	});

	return Command;
});
