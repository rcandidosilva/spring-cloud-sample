// Gruntfile

module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    /**
     * Define Configuration Variables.
     * Note: cwd is './setup' so the `setup` variable defined below is only to be used
     *       when cwd has been changed to `app` and grunt needs to reference './setup'
     */
    var gruntConfig = grunt.file.readJSON('Gruntconfig.json');

    // Grunt Config
    grunt.initConfig({
        cvars: gruntConfig.configVars,
        bower: {
            setup: {
                options: {install: true, copy: false}
            }
        },
        copy: {
            setup: {
                files: [
                    // Javascript with standard .min.js naming convention
                    {
                        cwd: 'bower_components', expand: true, flatten: true,
                        dest: '<%= cvars.app %>/<%= cvars.appjs %>/ext/',
                        src: gruntConfig.bowerFiles
                    },
                    // CSS with standard .min.css naming convention
                    {
                        cwd: 'bower_components', expand: true, flatten: true,
                        dest: '<%= cvars.app %>/<%= cvars.appcss %>/ext/',
                        src: gruntConfig.cssFiles
                    },
                    // CSS Fonts
                    {
                        cwd: 'bower_components', expand: true, flatten: true,
                        dest: '<%= cvars.app %>/<%= cvars.appcss %>/fonts/',
                        src: gruntConfig.cssFonts
                    }
                ]
            },
            build: {
                files: [
                    {
                        cwd: '<%= cvars.app %>/', expand: true,
                        dest: '<%= cvars.build %>/',
                        src: gruntConfig.buildFiles
                    },
                    // CSS Fonts
                    {
                        cwd: 'bower_components', expand: true, flatten: true,
                        dest: '<%= cvars.build %>/fonts/',
                        src: gruntConfig.cssFonts
                    }
                ]
            },
            deploy: {
                files: [
                    {
                        cwd: '<%= cvars.build %>/', expand: true,
                        dest: '<%= cvars.dist %>/',
                        src: ['<%= cvars.appcss %>/**', 'images/**', 'fonts/**']
                    }
                ]
            }
        },

        clean: {
            options: {force: true},
            build: ['<%= cvars.build %>'],
            'post-requirejs': ['<%= cvars.build %>/<%= cvars.appjs %>/ext'],
            deploy: [
                '<%= cvars.dist %>/*'
            ]
        },

        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= cvars.app %>/images',
                    src: '{,*/}*.{png}',
                    //src: '{,*/}*.{png,jpg,gif}',
                    dest: '<%= cvars.build %>/images'
                }]
            }
        },

        svgmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= cvars.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= cvars.build %>/images'
                }]
            }
        },
        sass: {
            options: {
                includePaths: [
                    'bower_components'
                ]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= cvars.app %>/<%= cvars.appcss %>/scss',
                    src: ['*.scss'],
                    dest: '<%= cvars.app %>/<%= cvars.appcss %>/',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            build: {
                files: {
                    '<%= cvars.build %>/<%= cvars.appcss %>/main.css': [
                        '<%= cvars.app %>/<%= cvars.appcss %>/ext/{,*/}{,*/}*.css',
                        '<%= cvars.app %>/<%= cvars.appcss %>/main.css'
                    ]
                }
            }
        },
        preprocess: {
            build: {
                src: '<%= cvars.app %>/index.html',
                dest: '<%= cvars.build %>/index.build.html'
            }
        },
        htmlmin: {
            // See https://github.com/yeoman/grunt-usemin/issues/44 for using 2 passes
            build: {
                options: {
                    removeComments: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    // Cannot remove empty elements with angular directives
                    removeEmptyElements: false
                },
                files: [
                    {'<%= cvars.build %>/index.html': '<%= cvars.build %>/index.build.html'},
                    {
                        cwd: '<%= cvars.app %>/views/', expand: true, flatten: false,
                        dest: '<%= cvars.build %>/views/',
                        src: ['*.html']
                    }
                ]
            },
            deploy: {
                options: {
                    collapseWhitespace: true
                },
                files: [
                    {'<%= cvars.dist %>/index.html': '<%= cvars.build %>/index.html'},
                    {
                        cwd: '<%= cvars.build %>/<%= cvars.appjs %>/main/templates/', expand: true,
                        dest: '<%= cvars.dist %>/<%= cvars.appjs %>/main/templates/',
                        src: ['*.html']
                    },
                    {
                        cwd: '<%= cvars.build %>/views/', expand: true,
                        dest: '<%= cvars.dist %>/views/',
                        src: ['**/*.html']
                    }
                ]
            }
        },
        requirejs: {
            build: {
                options: {
                    baseUrl: '<%= cvars.app %>/<%= cvars.appjs %>',
                    mainConfigFile: '<%= cvars.app %>/<%= cvars.appjs %>/main.js',
                    removeCombined: true,
                    findNestedDependencies: true,
                    waitSeconds: 0,
                    optimize: 'none',
                    dir: '<%= cvars.build %>/<%= cvars.appjs %>/',
                    modules: [
                        {name: 'app'},
                        {
                            name: 'controllers/home.controller',
                            exclude: ['include']
                        },
                        {
                            name: 'controllers/customer.controller',
                            exclude: ['include']
                        }
                    ]
                }
            }
        },
        uglify: {
            deploy: {
                options: {
                    preserveComments: false,
                    sourceMapIncludeSources: false,
                    sourceMap: false,
                    beautify: false,
                    mangle: true
                },
                files: [
                    {
                        cwd: '<%= cvars.build %>/<%= cvars.appjs %>/', expand: true,
                        dest: '<%= cvars.dist %>/<%= cvars.appjs %>/',
                        src: '**/*.js'
                    }
                ]
            }
        },
        jshint: {
            build: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: {
                    src: [
                        '<%= cvars.app %>/<%= cvars.appjs %>/{,*/}{,*/}{,*/}*.js',
                        '!<%= cvars.app %>/<%= cvars.appjs %>/ext/{,*/}*.js'
                    ]
                }
            }
        },

        watch: {
            www: {
                files: ['%= cvars.app %>/**/*'],
                tasks: [],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                livereload: true,
                options: {
                    port: gruntConfig.configVars.port,
                    base: '<%= cvars.app %>'
                }
            }
        }
    });


    /**
     * setup task
     * Run the initial setup, sourcing all needed upstream dependencies
     */
    grunt.registerTask('setup', ['bower:setup', 'copy:setup']);


    /**
     * devel task
     * Launch webserver and watch for changes
     */
    grunt.registerTask('devel', [
        'connect:server', 'watch:www'
    ]);

    /**
     * build task
     * Use r.js to build the project
     */
    grunt.registerTask('build', [
        'jshint:build',
        'clean:build',
        'preprocess:build',
        'htmlmin:build',
        'imagemin:build',
        'svgmin:build',
        'sass:server',
        'cssmin:build',
        'requirejs:build',
        'clean:post-requirejs',
        'copy:build'
    ]);


    /**
     * deploy task
     * Deploy to dist_www directory
     */
    grunt.registerTask('deploy', [
        'setup',
        'build',
        'clean:deploy',
        'htmlmin:deploy',
        'copy:deploy',
        'uglify:deploy'
    ]);

    grunt.registerTask('default', function () {
        // Use the force option for all tasks declared in the previous line
        grunt.option('force', true);
        grunt.task.run(['deploy']);
    });

};
