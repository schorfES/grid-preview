module.exports = function(grunt) {
	var
		pkg = grunt.file.readJSON('package.json'),
		merge = require('merge')
	;

	/* tasks configuration */
	grunt.initConfig({
		pkg: pkg,

		jshint: {
			all: [
				'Gruntfile.js',
				'src/js/src/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		jscs: {
			main: [
				'Gruntfile.js',
				'src/js/src/**/*.js'
			]
		},

		requirejs: {
			build: {
				options: merge(
					{
						modules: [
							{name: 'application'}
						],
						baseUrl: '.',
						appDir: 'src/js/src/', // source dir
						dir: 'bin/js/', // output dir
						almond: true, // simple AMD loader for build files
						findNestedDependencies: true, // allows nested require()-calls which is needed to build with shared requirejs config
						wrap: true, // to use with the almond option
						preserveLicenseComments: false,
						logLevel: 1
					},
					require('src/js/src/_config')
				)
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
						expand: true,
						cwd: 'src/fonts/',
						src: ['*'],
						dest: 'bin/fonts/'
					},
					{
						expand: true,
						cwd: 'src/img/',
						src: ['**'],
						dest: 'bin/img/'
					},
					{
						src: 'src/js/libs/modernizr/modernizr.js',
						dest: 'bin/js/modernizr.js'
					}
				]
			}
		},

		clean: {
			options: {
				force: true //delete files outside of current directory
			},
			build: [
				'bin/js/core/',
				'bin/js/application/',
				'bin/js/_config.js',
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
						},
						{
							pattern: 'src="js/libs/modernizr/modernizr.js"',
							replacement: 'src="js/modernizr.js"'
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

	/* load tasks */
	// grunt.loadNpmTasks('grunt-contrib-requirejs'); this contrib of
	// grunt-require.js doesn't support almond.js in build files.
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-jscs-checker');
	grunt.loadNpmTasks('grunt-lintspaces');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-git');

	/* define tasks */
	grunt.registerTask('init', [
		'gitclone'
	]);

	grunt.registerTask('validate', [
		'jshint',
		'jscs',
		'lintspaces'
	]);

	grunt.registerTask('build', [
		'requirejs:build',
		'copy:build',
		'exec:build',
		'clean:build',
		'string-replace:build'
	]);

	grunt.registerTask('default', [
		'validate',
		'build'
	]);
};
