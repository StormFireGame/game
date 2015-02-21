var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var del = require('del');

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var prettyHrtime = require('pretty-hrtime');

var startTime;

var paths;
var config;

var handleErrors;
var bundleLogger;

paths = {
  src: './src',
  app: './src/app',
  assets: './src/app/assets',

  dist: './dist'
};

config = {
  styles: {
    src: paths.assets + '/styles/main.less',
    watch: paths.assets + '/styles/**/*.less',
    dest: paths.dist + '/styles'
  },
  fonts: {
    src: paths.assets + '/fonts/**/*.eot',
    dest: paths.dist + '/fonts'
  },
  clean: {
    src: paths.dist
  },
  jshint: {
    src: paths.app + '/**/*.js'
  },
  scripts: {
    src: paths.app + '/app.js',
    outputName: 'bundle.js',
    dest: paths.dist + '/scripts',
    watch: paths.app + '/**/*.js'
  },
  browserify: {
    debug: true,
    extensions: ['.jsx']
  },
  images: {
    src: paths.assets + '/images/**/*.{png,jpg,gif,ico}',
    dest: paths.dist + '/images'
  },
  markup: {
    src: paths.src + '/*.html',
    dest: paths.dist
  },
  browserSync: {
    open: false,
    notify: false,
    port: 9000,
    server: {
      baseDir: [paths.dist, paths.src]
    },
    files: [
      paths.dist + '/**'
    ]
  }
};

handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  $.notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

bundleLogger = {
  start: function(filepath) {
    startTime = process.hrtime();
    $.util.log('Bundling', $.util.colors.green(filepath) + '...');
  },

  end: function() {
    var taskTime = process.hrtime(startTime),
        prettyTime = prettyHrtime(taskTime);

    $.util.log('Bundled in', $.util.colors.magenta(prettyTime));
  }
};

gulp.task('clean', function(cb) {
  del(config.clean.src, cb);
});

gulp.task('jshint', function() {
  // FIXME: lint jsx
  return gulp.src(config.jshint.src)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function() {
  return gulp.src(config.styles.src)
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .on('error', handleErrors)
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('fonts', function() {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('browserify-watch', function() {
  var rebundle;
  var args = watchify.args;
  var bundler;

  args.debug = config.browserify.debug;
  args.extensions = config.browserify.extensions;
  bundler = watchify(browserify(config.scripts.src, args));

  bundler.transform(['reactify', { es6: true }]);

  rebundle = function() {
    bundleLogger.start(config.scripts.outputName);

    return bundler.bundle()
      // log errors if they happen
      .on('error', handleErrors)
      .on('end', bundleLogger.end)
      .pipe(source(config.scripts.outputName))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe($.notify('Bundled in'))
      .pipe(browserSync.reload({ stream: true }));
  };

  bundler.on('update', rebundle);

  rebundle();
});

// TODO: check this article https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
gulp.task('scripts', function() {
  return gulp.src(config.scripts.src)
    .pipe($.browserify({
      transform: ['reactify']
    }))
    .on('error', handleErrors)
    .pipe($.rename(config.scripts.outputName))
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe($.imagemin())
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('markup', function(){
  return gulp.src(config.markup.src)
    .pipe(gulp.dest(config.markup.dest));
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.styles.watch, ['styles', browserSync.reload]);
  gulp.watch(config.images.src, ['images', browserSync.reload]);
  gulp.watch(config.markup.src, ['markup', browserSync.reload]);
  gulp.watch(config.fonts.src, ['fonts', browserSync.reload]);

  gulp.start('browserify-watch');
});

gulp.task('browserSync', ['watch:build'], function() {
  browserSync(config.browserSync);
});

gulp.task('watch:build', ['clean'], function() {
  gulp.start(['styles', 'images', 'fonts', 'markup']);
});

gulp.task('build', ['clean'], function() {
  gulp.start(['styles', 'scripts', 'images', 'fonts', 'markup']);
});

gulp.task('default', ['jshint']);

