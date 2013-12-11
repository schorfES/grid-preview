define(function(require) {

	var
		$ = require('jquery'),

		Command = function() {}
	;

	$.extend(Command.prototype, {
		execute: function() {
			window.open('https://github.com/schorfES/grid-preview');
		}
	});

	return Command;
});
