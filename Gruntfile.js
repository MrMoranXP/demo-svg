module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    svgstore: {
      options: {
        prefix : 'icon-'
      },
      default : {
        files: {
          'assets/images/sprite.svg': ['tmp/*.svg'],
        }
      }
    },
    clean: {
      svg: ["tmp"]
    },
    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false
          }, {
            removeUselessStrokeAndFill: false
          }
        ]
      },
      multiple: {
        files: [{
          expand:true,
          cwd: 'svg/',
          src: ['**/*.svg'],
          dest: 'tmp/'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.registerTask('default', ['svgmin', 'svgstore', 'clean']);
};