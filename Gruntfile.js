module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Grunt task configurations
        concat: {
            js: {
                src: [
                    './app/bower_components/angular/angular.js',
                    './app/bower_components/angular-loader/angular-loader.js',
                    './app/bower_components/angular-route/angular-route.js',
                    './app/app.js',
                    './app/controllers/*/*.js',
                    './app/lib/jquery.min.js',
                    './app/lib/bootstrap.min.js'
                ],
                dest: './app/all.concat.js'
            }
        },

        uglify: {
            js: {
                src: ['./app/all.concat.js'],
                dest: './app/all.concat.min.js'
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './app/css/all.concat.min.css': ['./app/css/bootstrap.css', './app/css/app.css']
                }
            }
        },

        clean: {
            js: {
                src: ['./app/all.concat.js']
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Delete unnecessary files
    grunt.file.delete('./app/all.concat.js');

    // Register default task
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'clean']);
};