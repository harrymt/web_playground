'use strict';

const production_url = "https://webtechnologies.herokuapp.com/";
const local_url = "http://localhost:3001/"



module.exports = function (grunt) {

  /**
   * Sleep process for number of seconds.
   */
  function sleep(secs) {
    var waitUntil = new Date().getTime() + secs * 1000;
    while(new Date().getTime() < waitUntil) true;
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      mocha: 'npm test',
      server: 'node server',
      gitstatus: 'git status',
      screenshot: 'grunt webshot && git commit -am "Auto generated screenshot" && git push',
      deploy: 'git checkout heroku/master && git pull && git checkout master && git push heroku master'
    },

    scsslint: {

      all: [
        'dev/scss/_partials/*.scss',
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
        tasks: ['scsslint', 'sass'],
        options: {
          spawn: false
        }
      },

      javascript: {
        files: ['dev/js/*.js'],
        tasks: ['exec:mocha', 'uglify']
      },

      pug: {
        files: ['views/*.pug', 'views/**/*.pug'],
        tasks: ['puglint']
      }
    },

    puglint: {
      views: {
        options: {
          extends: './views/.pug-lintrc' // config file
        },
        src: ['views/**/*.pug']
      }
    },

    pagespeed: {
      options: {
        nokey: true,
        url: production_url
      },
      prod: {
        options: {
          url: production_url,
          locale: "en_GB",
          strategy: "desktop",
          threshold: 30
        }
      },
      paths: {
        options: {
          paths: ["/", "/front-end", "/back-end", "/report", "/extras"],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 30
        }
      }
    },

    webshot: {
        homepage: {
            options: {
                siteType: 'url',
                site: production_url,
                savePath: './screenshot.png',
                windowSize: {
                    width: 1024,
                    height: 768
                },
                shotSize: {
                    width: 1024,
                    height: 'all'
                },
                renderDelay: 10
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-puglint'); // Lint Pug (HTML templates)
  grunt.loadNpmTasks('grunt-contrib-uglify'); // Minify JS
  grunt.loadNpmTasks('grunt-scss-lint'); // Lint SCSS files
  grunt.loadNpmTasks('grunt-contrib-sass'); // Process Sass files
  grunt.loadNpmTasks('grunt-contrib-watch'); // On file update, do task
  grunt.loadNpmTasks('grunt-exec'); // Run command line commands
  grunt.loadNpmTasks('grunt-pagespeed'); // Test page performance
  grunt.loadNpmTasks('grunt-webshot'); // Take a screenshot

  // Validate Pug and SCSS files
  grunt.registerTask('lint', ['puglint', 'scsslint']);

  // Minify and create CSS files
  grunt.registerTask('build', ['uglify', 'sass']);

  // Run unit tests and linting
  grunt.registerTask('tests', ['exec:mocha', 'lint']);

  // Check that we have commmited before a task
  grunt.registerTask('commit-warn', function() {
    grunt.log.warn("Make sure you have commited changes before deploying!");
    var seconds = 2;
    grunt.log.warn("Sleeping for " + seconds + " seconds, just to be sure.");
    sleep(seconds);
    grunt.log.ok("Continuing with deploying...");
  });

  // Deploy to heroku server, take screenshot then run page insight tests
  grunt.registerTask('deploy', ['exec:gitstatus', 'commit-warn', 'tests', 'build', 'exec:deploy', 'exec:screenshot', 'pagespeed']);

  // Do what you expect the default task to do
  grunt.registerTask('default', ['tests', 'build', 'exec:server']);
}