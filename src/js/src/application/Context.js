define(function(require) {

	var
		Geppetto = require('geppetto'),
		ApplicationStartupCommand = require('application/commands/ApplicationStartup'),
		GridUpdateCommand = require('application/commands/GridUpdate'),
		ActionGithubCommand = require('application/commands/ActionGithub'),
		ActionDownloadCommand = require('application/commands/ActionDownload')
	;

	return Geppetto.Context.extend({

		initialize: function() {
			this.mapCommand('application:start', ApplicationStartupCommand);
			this.mapCommand('config:changed', GridUpdateCommand);
			this.mapCommand('resizer:change', GridUpdateCommand);

			//Button Commands:
			this.mapCommand('action:github', ActionGithubCommand);
			this.mapCommand('action:download', ActionDownloadCommand);
		}

	});
});
