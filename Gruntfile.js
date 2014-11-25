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
      tmp : ["tmp"],
      scss: ["scss/_icon*.scss"],
      css: ["assets/stylesheets/main.css"]
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
    },
    iconizr: {
      options     : {
        common    : "svg-icon",
        dims      : true,
        render    : {
          css     : false,
          scss    : 'sass/_icons'
        },
      },
      files: {
        src  : 'svg',
        dest : 'tmp'
      },
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'tmp/icons', src: ['**'], dest: 'assets/images'},
          {expand: true, cwd: 'tmp/sass', src: ['_icons-svg-sprite.scss'], dest: 'scss'},
        ],
      },
    },
    sass: {
      dist: {
        files: {
          'assets/stylesheets/main.css': 'scss/main.scss'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'assets/stylesheets/main.min.css': ['assets/stylesheets/main.css']
        }
      }
    },
    webfont: {
      icons: {
        src: 'svg/*.svg',
        dest: 'assets/fonts',
        destCss: 'scss',
        options: {
          templateOptions: {
            baseClass: 'font-icon',
            classPrefix: 'font_',
            mixinPrefix: 'font-'
          },
          stylesheet: 'scss',
          htmlDemo: false,
          types: 'eot,woff,ttf',
          order: 'eot,woff,ttf',
          relativeFontPath: 'assets/fonts'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-iconizr');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.registerTask('default', ['clean', 'svgmin', 'svgstore', 'iconizr', 'webfont', 'copy', 'sass', 'cssmin', 'clean']);
};