module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'index.js', 'config/**/*.js', 'lib/**/*.js', 'test/**/*.js']
    },
    shell: {
      test: {
        command: 'npm test'
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['jshint', 'shell:test'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};