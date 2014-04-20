var gulp = require('gulp');

var connect = require('gulp-connect');
var uglify = require('gulp-uglifyjs');

var paths = {
  script: ['src/app.js', 'src/states/**/*.js', 'src/services/*.js'],
  css: ['src/style.css'],
  html: ['src/index.html', 'src/states/**/*.html']
};

gulp.task('connect', function() {
  connect.server({
    root: ['src', 'bower_components'],
    port: 8080,
    livereload: true
  });
});

gulp.task('script', function() {
  gulp.src(paths.script)
    .pipe(uglify('script.min.js', {
      outSourceMap: true,
      basePath: 'src/'
    }))
    .pipe(gulp.dest('src/'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(paths.css)
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(paths.script, ['script']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['script', 'connect', 'watch']);
