var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence');

gulp.task('clean', function () {
  return gulp.src('dist/', { read: false })
    .pipe($.clean({ force: true }));
});

gulp.task('jshint', function() {
  return gulp.src('src/app/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function () {
  gulp.src('src/app/assets/styles/main.less')
    .pipe($.less())
    .pipe(gulp.dest('dist/styles/'))
    .pipe($.connect.reload());
});

gulp.task('scripts', function () {
  gulp.src(['src/app/app.js'])
    .pipe($.browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe($.rename('bundle.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.connect.reload());
});

gulp.task('images', function () {
  gulp.src(['src/app/assets/images/**/*.{png,jpg,gif}'])
    .pipe($.imagemin())
    .pipe(gulp.dest('dist/images/'))
    .pipe($.connect.reload());
});

gulp.task('copy', function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe($.connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/app/**/*.js', ['scripts']);
  gulp.watch('src/app/assets/styles/**/*.scss', ['styles']);
  gulp.watch('src/app/assets/images/**/*', ['images']);
  gulp.watch('scr/*.html', ['copy']);
});

gulp.task('connect', function() {
  $.connect.server({
    root: 'dist',
    port: 9000,
    livereload: true
  });
});

gulp.task('build', function() {
  runSequence('clean', ['styles', 'scripts', 'images', 'copy']);
});
gulp.task('serve', ['build', 'connect', 'watch']);
gulp.task('default', ['jshint']);

