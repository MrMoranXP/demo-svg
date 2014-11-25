module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.registerTask('default', []);
  grunt.registerTask('dev', []);
};