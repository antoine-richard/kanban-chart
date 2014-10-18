var gulp       = require('gulp')
  , del        = require('del')
  , jshint     = require('gulp-jshint')
  , browserify = require('gulp-browserify')
  , rename     = require('gulp-rename')
  , ngAnnotate = require('gulp-ng-annotate')
  , uglify     = require('gulp-uglify');

gulp.task('clean', function (cb) {
  del('client/js/*', cb);
});

gulp.task('build', ['clean'], function() {
  gulp.src('client/src/main.js')
      .pipe(browserify({
        insertGlobals : false, // true ?
        debug : false
      }))
      .pipe(rename('bundle.js'))
      .pipe(uglify({mangle: false}))
      .pipe(gulp.dest('client/js'));
});

gulp.task('lint', function() {
  gulp.src('client/src/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('watch', ['default'], function() {
  gulp.watch(['client/src/**/*.js'], [
    'lint',
    'build'
  ]);
});

gulp.task('default', ['lint', 'build']);