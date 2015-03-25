var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var nodemon = require('gulp-nodemon');

gulp.task('start', function() {
  /*jshint quotmark: false */
  nodemon({
    script: 'app.js',
    verbose: true,
    ignore: ['public/*', 'node_modules/*'],
    execMap: {
      js: "DEBUG='game:*' node --harmony --debug"
    },
    watch: ['*.js', '*.png'],
    events: {
      /*jslint maxlen: false */
      crash: "osascript -e 'display notification \"Game app crashed\" with title \"nodemon\"'"
    }
  });
});

gulp.task('jshint', function() {
  return gulp.src(['**/*.js', '!node_modules/**', '!public/**'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('default', ['jshint']);
