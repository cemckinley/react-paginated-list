
module.exports = function(grunt) {

  var path = require('path');


  // Project configuration.
  grunt.initConfig({


    /* GENERAL CONFIG OPTIONS */

    pkg: grunt.file.readJSON('package.json'),
    /**
     * The path the server should run as site root
     * @type {String}
     */
    root: 'app',
    /**
     * The port number to mount the node server on
     * @type {Number}
     */
    port: 8001,


    /* TASK CONFIG */

    'browserify': {
      dev: {
        src: ['<%= root %>/js/index.jsx'],
        dest:'<%= root %>/js/bundle.js',
        options: {
          alias: ['react:'],
          debug: true
        }
      },
      options: {
        transform: ['reactify'],
        extensions: ['.jsx']
      }
    },

    'connect': {
      server: {
        options: {
          hostname: '*',
          port: '<%= port %>',
          base: '<%= root %>'
        }
      }
    },

    'watch': {
      scripts: {
        files: [
          '<%= root %>/js/**/*.js',
          '<%= root %>/js/**/*.jsx',
          '!<%= root %>/js/bundle.js'
        ],
        tasks: ['browserify']
      }
    }
  });


  /**
   * Compile files and start a static server from the site root directory
   */
  grunt.registerTask('run', [
    'browserify',
    'connect',
    'watch'
  ]);

  /* LOAD TASK DEPENDENCIES */

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-browserify'); /* for some reason this task won't load automatically */

};