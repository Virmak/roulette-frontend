var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

gulp.task('webserver', () => {
  connect.server({
    src: 'public'
  });
})


var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {},
}).plugin(tsify));

gulp.task('server', function() {
    gulp.src('public')	// <-- your app folder
      .pipe(server({
        livereload: true,
        open: true,
        port: 6000	// set a port to avoid conflicts with other local apps
      }));
  });

function bundle() {
  return watchedBrowserify
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public'));
}

gulp.task('default', bundle);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);
