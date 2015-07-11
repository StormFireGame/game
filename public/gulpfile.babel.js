import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del from 'del';

import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';

import prettyHrtime from 'pretty-hrtime';

const $ = loadPlugins();
let startTime;

const paths = {
  src: './src',
  app: './src/app',
  assets: './src/app/assets',

  dist: './dist'
};

const config = {
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
    src: paths.src + '/index.html',
    dest: paths.dist,
    data: {
      env: 'development'
    }
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

function handleErrors() {
  const args = Array.prototype.slice.call(arguments);

  $.notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
}

const bundleLogger = {
  start(filepath) {
    startTime = process.hrtime();
    $.util.log('Bundling', $.util.colors.green(filepath) + '...');
  },

  end() {
    const taskTime = process.hrtime(startTime);
    const prettyTime = prettyHrtime(taskTime);

    $.util.log('Bundled in', $.util.colors.magenta(prettyTime));
  }
};

gulp.task('clean', (cb) => {
  del(config.clean.src, cb);
});

gulp.task('eslint', () => {
  return gulp.src(config.lint.src)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('styles', () => {
  return gulp.src(config.styles.src)
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .on('error', handleErrors)
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('fonts', () => {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('browserify-watch', () => {
  const args = watchify.args;

  args.debug = config.browserify.debug;
  args.extensions = config.browserify.extensions;
  const bundler = watchify(browserify(config.scripts.src, args));

  bundler.transform(babelify.configure({
    stage: 0
  }));

  function rebundle() {
    bundleLogger.start(config.scripts.outputName);

    return bundler.bundle()
      .on('error', handleErrors)
      .on('end', bundleLogger.end)
      .pipe(source(config.scripts.outputName))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe($.notify('Bundled in'))
      .pipe($.connect.reload());
  }

  bundler.on('update', rebundle);

  rebundle();
});

gulp.task('scripts', () => {
  const options = {
    extensions: config.browserify.extensions,
    debug: config.browserify.debug
  };

  return browserify(config.scripts.src, options)
    .transform(babelify.configure({
      stage: 0
    }))
    .bundle()
    .pipe(source(config.scripts.outputName))
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('images', () => {
  return gulp.src(config.images.src)
    .pipe($.imagemin())
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('markup', () => {
  return gulp.src(config.markup.src)
    .pipe($.processhtml({
      data: config.markup.data
    }))
    .pipe(gulp.dest(config.markup.dest));
});

gulp.task('watch', ['connect'], () => {
  gulp.watch(config.styles.watch, ['styles', $.connect.reload]);
  gulp.watch(config.images.src, ['images', $.connect.reload]);
  gulp.watch(config.markup.src, ['markup', $.connect.reload]);
  gulp.watch(config.fonts.src, ['fonts', $.connect.reload]);

  gulp.start('browserify-watch');
});

gulp.task('connect', () => {
  $.connect.server(config.connect);
});

gulp.task('watch:build', ['clean'], () => {
  gulp.start(['styles', 'images', 'fonts', 'markup']);
});

gulp.task('lint', ['eslint']);

gulp.task('start', ['styles', 'images', 'fonts', 'markup'], () => {
  gulp.start(['watch']);
});

gulp.task('build', ['clean', 'lint'], () => {
  config.markup.data.env = 'stage';
  gulp.start(['styles', 'scripts', 'images', 'fonts', 'markup']);
});

gulp.task('default', ['lint']);
