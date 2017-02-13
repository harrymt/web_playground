'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.initConfig({

    scsslint: {
      all: [
        'dev/scss/**/*.scss',
        'dev/scss/*.scss'
      ]
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },

        files: {
          'public/css/style.css': 'dev/scss/style.scss'
        }
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          'public/js/main.min.js': ['dev/js/main.js']
        }
      }
    },

    watch: {
      css: {
        files: ['dev/scss/*.scss', 'dev/scss/**/*.scss'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      },

      javascript: {
        files: ['dev/js/*.js'],
        tasks: ['default']
      },

      pug: {
        files: ['views/*.pug', 'views/**/*.pug'],
        tasks: ['default']
      }
    },

    puglint: {
      views: {
        options: {
          extends: './views/.pug-lintrc' // config file
        },
        src: ['views/**/*.pug']
      }
    }
  });



  grunt.loadNpmTasks('grunt-puglint'); // Lint Pug (HTML templates)
  grunt.loadNpmTasks('grunt-contrib-uglify'); // Minify JS
  grunt.loadNpmTasks('grunt-scss-lint'); // Lint SCSS files
  grunt.loadNpmTasks('grunt-contrib-sass'); // Process Sass files
  grunt.loadNpmTasks('grunt-contrib-watch'); // On file update, do task

  grunt.registerTask('default', ['puglint', 'scsslint', 'uglify', 'sass']);
};