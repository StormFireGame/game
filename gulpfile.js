var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('jshint', function() {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('default', ['jshint']);
