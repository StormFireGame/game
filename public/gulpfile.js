var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var connect = require('gulp-connect');
var del = require('del');

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

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
  lint: {
    src: ['./gulpfile.js', paths.app + '/**/*.js', paths.app + '/**/*.jsx']
  },
  scripts: {
    src: paths.app + '/app.js',
    outputName: 'bundle.js',
    dest: paths.dist + '/scripts'
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
  connect: {
    root: [paths.dist, paths.src],
    livereload: true,
    port: 9008
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

  $.notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
};

bundleLogger = {
  start: function(filepath) {
    startTime = process.hrtime();
    $.util.log('Bundling', $.util.colors.green(filepath) + '...');
  },

  end: function() {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);

    $.util.log('Bundled in', $.util.colors.magenta(prettyTime));
  }
};

gulp.task('clean', function(cb) {
  del(config.clean.src, cb);
});

gulp.task('eslint', function() {
  return gulp.src(config.lint.src)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
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

  bundler.transform(babelify.configure({
    stage: 0
  }));

  rebundle = function() {
    bundleLogger.start(config.scripts.outputName);

    return bundler.bundle()
      .on('error', handleErrors)
      .on('end', bundleLogger.end)
      .pipe(source(config.scripts.outputName))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe($.notify('Bundled in'))
      .pipe(connect.reload());
  };

  bundler.on('update', rebundle);

  rebundle();
});

gulp.task('scripts', function() {
  var options = {
    extensions: config.browserify.extensions,
    debug: config.browserify.debug
  };

  return browserify(config.scripts.src, options)
    .transform(config.browserify.transform)
    .bundle()
    .pipe(source(config.scripts.outputName))
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('images', function() {
  return gulp.src(config.images.src)
    .pipe($.imagemin())
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('markup', function() {
  return gulp.src(config.markup.src)
    .pipe(gulp.dest(config.markup.dest));
});

gulp.task('watch', ['connect'], function() {
  gulp.watch(config.styles.watch, ['styles', connect.reload]);
  gulp.watch(config.images.src, ['images', connect.reload]);
  gulp.watch(config.markup.src, ['markup', connect.reload]);
  gulp.watch(config.fonts.src, ['fonts', connect.reload]);

  gulp.start('browserify-watch');
});

gulp.task('browserSync', ['watch:build'], function() {
  browserSync(config.browserSync);
});

gulp.task('connect', function() {
  connect.server(config.connect);
});

gulp.task('watch:build', ['clean'], function() {
  gulp.start(['styles', 'images', 'fonts', 'markup']);
});

gulp.task('lint', ['eslint']);

gulp.task('start', ['watch']);

gulp.task('build', ['clean', 'lint'], function() {
  gulp.start(['styles', 'scripts', 'images', 'fonts', 'markup']);
});

gulp.task('default', ['lint']);
