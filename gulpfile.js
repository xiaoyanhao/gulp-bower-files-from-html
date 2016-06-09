var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gulpBowerFilesFromHtml = require('./index.js')

gulp.task('mocha', function() {
  return gulp.src('./test/index.js', {read: false})
    .pipe(mocha());
});

gulp.task('watch', function() {
  gulp.watch(['./test/*', './index.js'], ['mocha']);
});

gulp.task('default', ['mocha', 'watch']);

gulp.task('test', function() {
  return gulp.src('./test/*.html', {buffer: true})
    .pipe(gulpBowerFilesFromHtml('./test/bower_components'))
    .pipe(gulp.dest('./dist'))
})