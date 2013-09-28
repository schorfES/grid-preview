module.exports = function(grunt) {
	var
		pkg = grunt.file.readJSON('package.json')
	;

	// project configuration
	grunt.initConfig({
		pkg: pkg,

		jshint: {
			all: [
				'Gruntfile.js',
				'src/js/src/**/*.js'
			],
			options: {
				'boss': true,
				'curly': true,
				'eqeqeq': true,
				'eqnull': true,
				'expr': true,
				'globals': {
					'define': true,
					'require': true,
					'module': true,
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

		requirejs: {
			build: {
				options: {
					baseUrl: '.',
					appDir: 'src/js/src/', /* source dir */
					dir: 'bin/js/', /* output dir */
					modules: [
						{
							name: 'application'
						}
					],
					paths: {
						jquery: '../libs/jquery/jquery',
						underscore: '../libs/underscore/underscore',
						backbone: '../libs/backbone/backbone',
						wreqr: '../libs/backbone/backbone.wreqr',
						babysitter: '../libs/backbone/backbone.babysitter',
						marionette: '../libs/backbone/backbone.marionette',
						geppetto: '../libs/backbone/backbone.geppetto',
						text: '../libs/require/require.text'
					},
					shim: {
						jquery: {
							exports: '$'
						},
						underscore: {
							exports: '_'
						},
						backbone: {
							deps: ['underscore', 'jquery'],
							exports: 'Backbone'
						},
						wreqr: {
							deps: ['backbone'],
							exports: 'Backbone.Wreqr'
						},
						babysitter: {
							deps: ['backbone'],
							exports: 'Backbone.BabySitter'
						},
						marionette: {
							deps: ['wreqr', 'babysitter'],
							exports: 'Backbone.Marionette'
						},
						geppetto: {
							deps: ['marionette'],
							exports: 'Backbone.Geppetto'
						}
					},
					almond: true, /* simple AMD loader for build files */
					wrap: true, /* to use with the almond option */
					preserveLicenseComments: false,
					logLevel: 1
				}
			}
		},

		connect: {
			dev: {
				options: {
					port: 8000,
					base: 'src',
					keepalive: true
				}
			},
			prod: {
				options: {
					port: 8000,
					base: 'bin',
					keepalive: true
				}
			}
		},

		copy: {
			build: {
				files: [
					{
						src: 'src/index.html',
						dest: 'bin/index.html'
					},
					{
						src: 'src/fonts',
						dest: 'bin/fonts'
					}
				]
			}
		},

		clean: {
			options: {
				force: true /* delete files outside of current directory */
			},
			build: [
				'bin/js/core/',
				'bin/js/application/',
				'bin/js/build.txt'
			]
		},

		'string-replace': {
			build: {
				files: {
					'bin/index.html': 'bin/index.html'
				},
				options: {
					replacements: [
						{
							pattern: 'data-main="js/src/application" src="js/libs/require/require.js"',
							replacement: 'src="js/application.js"'
						}
					]
				}
			}
		},

		lintspaces: {
			all: {
				src: [
					'Gruntfile.js',
					'src/js/src/**/*',
					'src/scss/**/*'
				],
				options: {
					newline: true,
					trailingspaces: true,
					indentation: 'tabs'
				}
			}
		},

		exec: {
			build: {
				command: 'compass compile -c configBuild.rb'
			}
		},

		gitclone: {
			ghpages: {
				options: {
					repository: pkg.repository.url,
					branch: 'gh-pages',
					directory: 'bin'
				}
			}
		}
	});

	// load tasks
	/* grunt.loadNpmTasks('grunt-contrib-requirejs'); this contrib of
	* grunt-require.js doesn't support almond.js in build files. */
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-lintspaces');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-git');

	// define tasks
	grunt.registerTask('init', [
		'gitclone'
	]);

	grunt.registerTask('validate', [
		'jshint',
		'lintspaces'
	]);

	grunt.registerTask('build', [
		'copy:build',
		'requirejs:build',
		'exec:build',
		'clean:build',
		'string-replace:build'
	]);

	grunt.registerTask('default', [
		'validate',
		'build'
	]);
};
