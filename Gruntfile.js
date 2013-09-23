module.exports = function(grunt) {
	// project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: [
				'Gruntfile.js'
			],
			options: {
				'boss': true,
				'curly': true,
				'eqeqeq': true,
				'eqnull': true,
				'expr': true,
				'globals': {
					'module': true,
					'require': true,
					'exports': true,
					'__dirname': true,
					'window': true
				},
				'immed': true,
				'noarg': true,
				'onevar': true,
				'quotmark': 'single',
				'smarttabs': true,
				'trailing': true,
				'undef': true,
				'unused': true
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: '.',
					keepalive: true
				}
			}
		},

		copy: {
			build: {
				files: [
					{
						expand: true,
						src: [
							'index.html'
						],
						dest: 'gh-pages/'
					}
				]
			}
		},

		lintspaces: {
			all: {
				src: [
					'Gruntfile.js'
				],
				options: {
					newline: true,
					trailingspaces: true,
					indentation: 'tabs'
				}
			}
		}
	});

	// load tasks
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-lintspaces');

	// define tasks
	grunt.registerTask('validate', [
		'jshint',
		'lintspaces'
	]);

	grunt.registerTask('build', [
		'copy:build'
	]);

	grunt.registerTask('default', [
		'validate',
		'build'
	]);
};
