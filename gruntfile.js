module.exports = function(grunt) {

    // Auto load plugins
    require('load-grunt-tasks')(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // Javascript linter
        jshint: {
            all: ['Gruntfile.js', '*.js']
        },

        // Minify scripts
        uglify: {
            options: {
            	mangle: false
            },
            main: {
                files: {
                    '*.min.js': ['*.js']
                }
            }
        },

        // Compile SASS
        sass: {
            options: {

            },
            // Production
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false
                },
                files: { 
                    'public/stylesheets/style.min.css': 'scss/style.scss' 
                }
            },
            // Development
            dev: {
            	options: {
                    outputStyle: 'expanded',
                    sourceMap: true
            	},
            	files: {
                    'public/stylesheets/style.css': 'scss/style.scss' 
            	}
            }
        },

        // Watch and live reload
        watch: {
            sass: {
                files: ['scss/*.scss', 'scss/*/*.scss', 'scss/*/*/*.scss'],
                tasks: ['sass:dist']
            },
            other: {
                files: ['public/tpl/*.handlebars', '*.js', 'routes/*.js', 'views/*.jade']
            },
            // Live reload on file changes
            options: { 
                livereload: true 
            }
        }
    });

    //Default task(s)
    grunt.registerTask('livereload', ['watch']);
    grunt.registerTask('checkjs', ['jshint']);
    grunt.registerTask('default', ['uglify', 'sass']);
};