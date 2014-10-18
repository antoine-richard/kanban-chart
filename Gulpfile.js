var gulp        = require('gulp')
  , del         = require('del')
  , jshint      = require('gulp-jshint')
  , browserify  = require('browserify')
  , source      = require('vinyl-source-stream')
  , buffer      = require('vinyl-buffer')
  , sourcemaps  = require('gulp-sourcemaps')
  , uglify      = require('gulp-uglify')
  , util        = require('gulp-util')
  , watchify    = require('watchify')
  , browserSync = require('browser-sync');


/* RELEASE MODE (one shot) */

// Default task
gulp.task('default', ['lint', 'browserify']);

// Lint task
gulp.task('lint', function() {
  gulp.src([
    './client/src/**/*.js',
    './gulpfile.js'
  ])
  .pipe(jshint({ laxcomma: true }))
  .pipe(jshint.reporter('default'));
});

// Clean task
gulp.task('clean', function (cb) {
  del('./client/js', cb);
});

// Browserify task
gulp.task('browserify', ['clean'], function() {

  var bundler = browserify({
    entries: ['./client/src/main.js'],
    debug: true
  });

  function bundle() {
    return bundler.bundle()
      .on('error', util.log.bind(util, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify({mangle: false}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./client/js/'));
  }

  return bundle();
});


/* DEV MODE (watch) */

// BrowserSync task
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// Watchify task (without uglify nor sourceMaps)
gulp.task('watchify', function() {

  var bundler = watchify(browserify('./client/src/main.js', watchify.args));

  function rebundle() {
    return bundler.bundle()
      .on('error', util.log.bind(util, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./client/js/'));
  }

  bundler.on('update', rebundle);
  return rebundle();
});

// Watch task
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('./client/src/**/*.js', ['watchify', browserSync.reload]);
});