var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('default',[])

//gulp.task('default',['sass','sass:watch','babel','babel:watch','start'])

gulp.task('start',function(){
  nodemon({
    script: './server/server.js',
    ext:'js',
    env:{'NODE_ENV':development}
  })
});

gulp.task('sass', function () {
  //wildcard search for files indicated by *
  return gulp.src('./client/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'));
});

//for watching for scss file changes
gulp.task('sass:watch', function () {
  gulp.watch('./client/scss/**/*.scss', ['sass']);
});
