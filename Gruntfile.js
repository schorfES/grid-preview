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
			compile: {
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
						marionette: {
							deps: ['wreqr'],
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
				'bin/js/grid-preview/',
				'bin/js/build.txt'
			]
		},

		lintspaces: {
			all: {
				src: [
					'Gruntfile.js',
					'src/js/src/**/*.js'
				],
				options: {
					newline: true,
					trailingspaces: true,
					indentation: 'tabs'
				}
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
	grunt.loadNpmTasks('grunt-lintspaces');
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
		'requirejs',
		'clean:build'
	]);

	grunt.registerTask('default', [
		'validate',
		'build'
	]);
};
