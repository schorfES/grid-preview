define(function() {

	var
		Command = function() {}
	;

	Command.prototype.execute = function() {
		window.open('https://github.com/schorfES/grid-preview');
	};

	return Command;

});
