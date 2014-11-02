var gulp        = require('gulp')
  , del         = require('del')
  , jshint      = require('gulp-jshint')
  , browserify  = require('browserify')
  , source      = require('vinyl-source-stream')
  , buffer      = require('vinyl-buffer')
  , ngannotate  = require('browserify-ngannotate')
  , minifyify   = require('minifyify')
  , mocha       = require('gulp-mocha')
  , util        = require('gulp-util')
  , watchify    = require('watchify')
  , browserSync = require('browser-sync');


/* RELEASE MODE (one shot) */

// Default task
gulp.task('default', ['test', 'browserify']);

// Lint
gulp.task('lint', function() {
  gulp.src([
    './client/src/**/*.js',
    './client/test/**/*.js',
    './gulpfile.js'
  ])
  .pipe(jshint({ laxcomma: true }))
  .pipe(jshint.reporter('default'));
});

// Test
gulp.task('test', ['lint'], function () {
  return gulp.src([
    './client/test/**/*.js'
  ])
  .pipe(mocha(/*{ reporter: 'dot' }*/));
});

// Clean
gulp.task('clean', function (cb) {
  del('./client/js', cb);
});

// Browserify
gulp.task('browserify', ['clean'], function() {

  return browserify({
    entries: ['./client/src/main.js'],
    debug: true
  })
  .transform(ngannotate)
  .plugin('minifyify', {
    map: 'bundle.js.map',
    output: './client/js/bundle.js.map'
  })
  .bundle()
  .on('error', util.log.bind(util, 'Browserify Error'))
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./client/js/'));

});


/* DEV MODE (watch) */

// Watchify (without uglify nor sourcemaps)
gulp.task('watchify', function() {

  var bundler = watchify(browserify('./client/src/main.js', {debug: true}));

  function rebundle() {
    return bundler.bundle()
      .on('error', util.log.bind(util, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./client/js/'))
      .pipe(browserSync.reload({stream: true, once: true}));
  }

  bundler.on('update', rebundle);

  return rebundle();
});

// Watch (BrowserSync)
gulp.task('watch', ['watchify'], function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});