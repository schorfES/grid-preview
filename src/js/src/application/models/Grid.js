define(function(require) {

	var
		$ = require('jquery'),
		_ = require('underscore'),
		Base64 = require('core/utils/Base64'),
		Backbone = require('backbone'),
		SparkMD5 = require('sparkmd5'),

		UNITS = ['%','px'],
		MINIFY_SPACER = ',',
		HASH_SPACER = '|'
	;

	return Backbone.Model.extend({
		defaults: {
			fluid: false,
			columns: 12,
			widthUnit: '%',
			maxWidth: 960,
			maxWidthUnit: 'px',
			gutterWidth: 2.4,
			gutterWidthUnit: '%'
		},

		encode: function() {
			var
				data = this.toJSON(),
				minified = this._minifyDataset(data),
				hash = this._getVersionHash(),
				output = minified + HASH_SPACER + hash
			;

			return Base64.encode(output);
		},

		decode: function(base64) {
			var
				input = Base64.decode(base64).split(HASH_SPACER),
				data
			;

			// Check current version hash with current version hash of
			// this model:
			if (input.length === 2 && input[1] === this._getVersionHash()) {
				// Version is the same, read data:
				data = this._maxifyDataset(input[0]);
				this.set($.extend({}, this.defaults, data));
			}
		},

		_listAttributes: function() {
			var
				attributes = [],
				attribute
			;

			for (attribute in this.defaults) {
				attributes.push(attribute);
			}

			return attributes.sort();
		},

		_getVersionHash: function() {
			return SparkMD5.hash(this._listAttributes().join(''));
		},

		/* This function builds a string list of the given data according the
		/* default set of attributes of this model. The spacer of the list is
		/* specified in the MINIFY_SPACER variable. The types of String and
		/* Boolean will be transferred into Integers. */
		_minifyDataset: function(data) {
			var
				attributes = this._listAttributes(),
				output = ''
			;

			_.each(attributes, function(attribute) {
				var value = data[attribute];

				if (typeof value === 'string') {
					// Transform string into index of predefined values given
					// by the UNITS constant:
					value = _.indexOf(UNITS, value);
				} else if (typeof value === 'boolean') {
					// Transform booleans into integers:
					value = value ? 1 : 0;
				}

				// Concat values with spacer:
				if (output.length > 0) {
					output += MINIFY_SPACER;
				}

				output += value;
			});

			return output;
		},

		/* This function returns a given minified string list into a data
		/* object. It transforms all attributes backwarts into their orign
		/* types and attibute names */
		_maxifyDataset: function(list) {
			var
				attributes = this._listAttributes(),
				data = {},
				values,
				value
			;

			if (typeof list === 'string' && list.length > 0) {
				values = list.split(MINIFY_SPACER);
				_.each(attributes, function(attribute, index) {
					value = values[index];

					if (typeof this.defaults[attribute] === 'string') {
						// The default value at this index is type of string.
						// Map value backwarts with predefined UNITS constant:
						value = UNITS[value];
					} else if (typeof this.defaults[attribute] === 'boolean') {
						// Transform integer into a boolean:
						value = (value === 1);
					} else {
						// Transform all other stringvalues into a number:
						value = parseFloat(value, 10);
					}

					// Store transformed value into property of dataset:
					data[attribute] = value;
				}, this);
			}

			return data;
		}

	});

});
