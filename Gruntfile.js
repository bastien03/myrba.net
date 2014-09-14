module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    myrba: {
      app: 'app',
      dist: 'dist'
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    // VALIDATE JS IN CASE OF CODE QUALITY
    jshint: {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        files: [
            '<%= myrba.app %>/**/*.js'
        ]
    },

    // The actual grunt server settings
    connect: {
        options: {
            port: 9000,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: '0.0.0.0',
            livereload: 35729
        },
        livereload: {
            options: {
                open: true,
                base: ['.tmp', '<%= myrba.app %>'],
                /*middleware: function (connect, options) {
                    var middlewares = [];
                    if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                    }
                    // Setup the proxy
                    middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);
                    // Serve static files
                    options.base.forEach(function (base) {
                        middlewares.push(connect.static(base));
                    });
                    return middlewares;
                }*/
            }
        }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
        bower: {
            files: ['bower.json'],
            tasks: ['bowerInstall']
        },
        js: {
            files: ['<%= myrba.app %>/**/*.js'],
            tasks: ['jshint'],
            options: {livereload: true}
        },
        gruntfile: {
            files: ['Gruntfile.js'],
            options: {livereload: true}
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                '<%= myrba.app %>/{,*/}*.html',
                '<%= myrba.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  grunt.registerTask('serve', function (target) {
      if (target === 'dist') {
          return grunt.task.run(['build', 'connect:dist:keepalive']);
      }


      grunt.task.run([
          'connect:livereload',
          'watch'
      ]);

  });

};