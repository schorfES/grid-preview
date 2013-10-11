define(function(require) {

	var
		Geppetto = require('geppetto'),
		ApplicationStartupCommand = require('application/commands/ApplicationStartup'),
		GridUpdateCommand = require('application/commands/GridUpdate'),
		OpenGithubCommand = require('application/commands/OpenGithub')
	;

	return Geppetto.Context.extend({

		initialize: function() {
			this.mapCommand('application:start', ApplicationStartupCommand);
			this.mapCommand('config:changed', GridUpdateCommand);
			this.mapCommand('resizer:change', GridUpdateCommand);

			//Button Commands:
			this.mapCommand('click:github', OpenGithubCommand);
		}

	});
});
