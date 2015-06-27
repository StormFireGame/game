var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var nodemon = require('gulp-nodemon');

gulp.task('start', function() {
  /* eslint quotes: 0 */
  nodemon({
    script: 'app.js',
    verbose: true,
    ignore: ['public/*', 'node_modules/*'],
    execMap: {
      js: "DEBUG='game:*' babel-node --harmony --debug"
    },
    watch: ['*.js', '*.png'],
    events: {
      /* eslint max-len: 0 */
      crash: "osascript -e 'display notification \"Game app crashed\" with title \"nodemon\"'"
    }
  });
});

// https://gist.github.com/nkbt/9efd4facb391edbf8048
gulp.task('eslint', function() {
  return gulp.src(['**/*.js', '!node_modules/**', '!public/**'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('lint', ['eslint']);

gulp.task('default', ['lint']);
