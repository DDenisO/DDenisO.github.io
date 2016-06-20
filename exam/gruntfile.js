module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['styles/variables.scss','styles/mixins.scss','styles/reset.scss','styles/style320px.scss','styles/style768px.scss','styles/style1440px.scss','styles/styleBigpx.scss'],
        dest: 'styles/main.scss'
      }
    },
      sass: {
        dist: {
          files: [{
            expand: true,
            cwd: 'styles',
            src: ['main.scss'],
            dest: 'styles',
            ext: '.css'
          }]
        }
          },
          watch: {
            sass: {
              files: ['styles/*.scss'],
              tasks: ['concat', 'sass']
            }
          }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'uglify', 'sass']);
};