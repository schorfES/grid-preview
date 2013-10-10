define(function(require) {
	var
		$ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!application/views/config/Template.html')
	;

	require('uniform');

	return Backbone.View.extend({

		template: _.template(Template),

		events: {
			'keyup input': '_onFieldChange',
			'change input': '_onFieldChange',
			'change select': '_onFieldChange'
		},

		render: function() {
			this._content = $(this.template(this.options.settings)).appendTo(this.$el);
			this._content.find('select').uniform({
				selectClass: 'select',
				selectAutoWidth: false
			});

			this._setupFields();

			return this;
		},

		_setupFields: function() {
			this._fieldColumns = this._content.find('[name="columns"]');
			this._fieldMaxWidth = this._content.find('[name="maxWidth"]');
			this._fieldMaxWidthUnit = this._content.find('[name="maxWidthUnit"]');
			this._fieldGutterWidth = this._content.find('[name="gutterWidth"]');
			this._fieldGutterWidthUnit = this._content.find('[name="gutterWidthUnit"]');
		},

		getColumns: function() {
			return this._fieldColumns.val();
		},

		getMaxWidth: function() {
			return this._fieldMaxWidth.val();
		},

		getMaxWidthUnit: function() {
			return this._fieldMaxWidthUnit.val();
		},

		getGutterWidth: function() {
			return this._fieldGutterWidth.val();
		},

		getGutterWidthUnit: function() {
			return this._fieldGutterWidthUnit.val();
		},

		_onFieldChange: function() {
			this.options.context.dispatch('config:changed');
		}

	});
});
