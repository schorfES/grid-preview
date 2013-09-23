define(function() {

	var
		Command = function() {}
	;

	Command.prototype.execute = function() {
		window.alert('Start up');
	};

	return Command;

});
