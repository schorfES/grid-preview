define(function(require) {

	var
		Geppetto = require('geppetto'),
		ApplicationStartupCommand = require('application/commands/ApplicationStartup')
	;

	return Geppetto.Context.extend({

		initialize: function() {
			this.mapCommand('application:start', ApplicationStartupCommand);
		}

	});
});
