'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.initConfig({
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
        files: ['dev/scss/*.scss'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      },

      javascript: {
        files: ['dev/js/*.js'],
        tasks: ['default']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify'); // Minify JS
  grunt.loadNpmTasks('grunt-contrib-sass'); // Process Sass files
  grunt.loadNpmTasks('grunt-contrib-watch'); // On file update, do task

  grunt.registerTask('default', ['uglify', 'sass']);
};