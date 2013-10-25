define(function(require) {

	var Marionette = require('marionette');

	Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
		// Marionette expects "templateId" to be the ID of a DOM element.
		// But with RequireJS, templateId is actually the full text of the template.
		var
			template = templateId,
			msg, err
		;

		// Make sure we have a template before trying to compile it
		if (!template || template.length === 0){
			msg = 'Could not find template: "' + templateId + '"';
			err = new Error(msg);
			err.name = 'NoTemplateError';
			throw err;
		}

		return template;
	};

	return {
		getApplication: function(applicationName) {

			// applicationName is required
			if (typeof applicationName !== 'string') {
				throw new window.Error('missing "applicationName" in getApplication(applicationName)');
			}

			return new Marionette.Application({
				name: applicationName
			});
		}
	};
});
