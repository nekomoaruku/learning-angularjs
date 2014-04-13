var gulp = require('gulp');

var connect = require('gulp-connect');
var uglify = require('gulp-uglifyjs');

var paths = {
  scripts: ['app.js', 'states/**/*.js', 'services/*.js'],
  htmls: ['index.html', 'states/**/*.html']
};

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 8080,
    livereload: true
  });
});

gulp.task('script', function() {
  gulp.src(paths.scripts)
    .pipe(uglify('script.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src(paths.htmls)
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['script']);
  gulp.watch(paths.htmls, ['html']);
});

gulp.task('default', ['connect', 'watch']);
