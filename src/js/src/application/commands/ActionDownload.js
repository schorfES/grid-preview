define(function(require) {

	var
		$ = require('jquery'),
		html2canvas = require('html2canvas'),

		Command = function() {}
	;

	$.extend(Command.prototype, {
		execute: function() {
			// Test if browser supports canvas-tag:
			if (window.Modernizr.canvas) {
				var
					grid = $('.grid').get(0)
				;

				if (grid) {
					// Start rendering the current DOM of the displayed grid
					// into a canvas element using 'html2canvas' lib:
					html2canvas(grid, {
						onrendered: $.proxy(this._onRendered, this)
					});
				}
			} else {
				window.alert('Sorry, your browser did\'t support this feature.');
			}
		},

		// This is a simplified implementation of the approach on
		// http://stackoverflow.com/questions/3916191/download-data-url-file
		_download: function(dataUrl, fileName) {
			var
				link = window.document.createElement('a'),
				body = window.document.body
			;

			// Append the link to the DOM because some browsers trigger the
			// click event when link is not attached in the visible DOM.
			// Remove the link after trigger click():
			body.appendChild(link);

			link.download = fileName;
			link.href = dataUrl;
			link.click();

			body.removeChild(link);
		},

		_onRendered: function(canvas) {
			// Trigger the dataURL of the canvas as download 'grid.png':
			this._download(
				canvas.toDataURL('image/png'),
				'grid.png'
			);
		}
	});

	return Command;
});
