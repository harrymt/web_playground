/* jslint node: true */

"use strict";

var production_url = "https://webtechnologies.herokuapp.com/";
var local_url = "http://localhost:3001/";


module.exports = function (grunt) {

  // Show running time of tasks
  require('time-grunt')(grunt);

  // Load grunt tasks just in time for speed
  require('jit-grunt')(grunt, {
    scsslint: 'grunt-scss-lint', // Because scss-lint has a - in it
  });

  /**
   * Sleep process for number of seconds.
   */
  function sleep(secs) {
    var waitUntil = new Date().getTime() + secs * 1000;
    while(new Date().getTime() < waitUntil) { }
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    exec: {
      server: 'node server',
      gitstatus: 'git status',
      git_commit_screenshot: 'git commit -am "Auto generated screenshot"',
      git_push: 'git push',
      git_checkout_heroku: 'git checkout heroku/master',
      git_pull: 'git pull',
      git_checkout_master: 'git checkout master',
      git_push_heroku: 'git push heroku master'
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

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['dev/js/util.js', 'dev/js/png-animation.js', 'dev/js/main.js'],
        dest: 'public/js/main.min.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          'public/js/main.min.js': ['public/js/main.min.js']
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
        tasks: ['concat', 'uglify']
      },

      pug: {
        files: ['views/*.pug', 'views/**/*.pug'],
        tasks: ['puglint']
      },

      svg: {
        files: ['dev/svg/*.svg'],
        tasks: ['svgmin']
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
          paths: ["/", "/front-end", "/back-end", "/report"],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 30
        }
      }
    },

    pageres: {
      screenshot: {
        options: {
          urls: production_url,
          sizes: ['1024x768'],
          dest: './',
          filename: 'screenshot'
        }
      }
    },
    imagemin: {
      public_images: {
        files: [
          {
            expand: true,  // Enable dynamic expansion.
            cwd: 'public/images/', // Src matches are relative to this path.
            src: ['*.png'], // Actual pattern(s) to match.
            dest: 'public/images/', // Destination path prefix.
            ext: '.png'   // Dest filepaths will have this extension.
          }
        ]
      }
    },
    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false },
          { convertShapeToPath: false },
          { removeUselessStrokeAndFill: false }
        ]
      },
      dist: {
        files: {
          'public/svg/spinnera.svg': 'dev/svg/spinnera.svg',
          'public/svg/spinnerb.svg': 'dev/svg/spinnerb.svg',
          'public/svg/spinnerc.svg': 'dev/svg/spinnerc.svg',
          'public/svg/spinnerd.svg': 'dev/svg/spinnerd.svg'
        }
      }
    }
  });


  //
  // $ grunt server
  //
  // Runs the NodeJS server task, starting a dev server on localhost:3001
  //
  grunt.registerTask('server', ['exec:server']);


  //
  // $ grunt lint
  //
  // Validates PUG and SCSS files with following subtasks
  //    puglint: validates .pug files against rules
  //    scsslint: validates .scss files against rules
  //
  grunt.registerTask('lint', ['puglint', 'scsslint']);

  //
  // $ grunt build
  //
  // Builds all files with the following sub tasks:
  //    concat: concatenates js files to a single file
  //    uglify: minifies the single js file
  //    sass: turn .scss files into a single .css file, minifying in the process
  //    imagemin: minifies the images by reducing filesize
  //    svgmin: minifies svg files to reduce filezie
  //
  grunt.registerTask('build', ['concat', 'uglify', 'sass', 'imagemin', 'svgmin']);

  //
  // $ grunt 'commit-warn'
  //
  // Check that we have commmited before running another task, like deploying.
  //
  grunt.registerTask('commit-warn', function() {
    grunt.log.warn("Make sure you have commited changes!");
    var seconds = 2;
    grunt.log.warn("Sleeping for " + seconds + " seconds, just to be sure.");
    sleep(seconds);
    grunt.log.ok("Continuing...");
  });

  //
  // $ grunt screenshot
  //
  // Take a screenshot then commit it to the repo with following sub tasks:
  //    pageres: renders the DOM and takes a screenshot
  //    exec:git_commit_screenshot: runs a git shell command to commit screenshot
  //    exec:git_push: runs a git shell command to push to repo
  //
  grunt.registerTask('screenshot', ['pageres', 'exec:git_commit_screenshot', 'exec:git_push']);

  //
  // $ grunt push
  //
  // Runs various git commands to push to repo.
  //
  grunt.registerTask('push', ['exec:git_checkout_heroku', 'exec:git_pull', 'exec:git_checkout_master', 'exec:git_push_heroku']);

  //
  // $ grunt deploy
  //
  // Deploys to a heroku server, takes a screenshot then run page insight tests.
  // Requires Heroku CLI installed, a Heroku account and `heroku login`
  //
  grunt.registerTask('deploy', ['exec:gitstatus', 'commit-warn', 'lint', 'build', 'push', 'screenshot', 'pagespeed']);

  //
  // $ grunt
  //
  // Lints, builds then starts a local server.
  // What you expect the default task to do.
  //
  grunt.registerTask('default', ['lint', 'build', 'exec:server']);

};
