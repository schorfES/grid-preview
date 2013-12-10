define(function(require) {

	var
		$ = require('jquery'),
		Marionette = require('marionette'),
		Application
	;

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

	Application = function(ContextClass) {
		if (typeof ContextClass === 'function') {
			this.context = new ContextClass({
				application: this
			});
		} else {
			throw new Error('No ContextClass supplied for Application.');
		}
	};

	$.extend(Application.prototype, new Marionette.Application(), {
		start: function() {
			Marionette.Application.prototype.start.apply(this, arguments);
			this.context.dispatch('application:start');
		}
	});

	return Application;
});
