var gulp = require('gulp')
var plumber = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

var paths = {
  scss: { source: 'assets/css/dev/*.scss', target: 'assets/css/prod/' },
  js: { source: 'assets/js/dev/*.js', target: 'assets/js/prod/' }
}

gulp.task('scss', function () {
  gulp.src(paths.scss.source)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.target))
})

gulp.task('js', function () {
  gulp.src(paths.js.source)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.js.target))
})

gulp.task('watch', function () {
  gulp.watch(paths.scss.source, ['scss'])
  gulp.watch(paths.js.source, ['js'])
})

gulp.task('default', ['scss', 'js', 'watch'])
