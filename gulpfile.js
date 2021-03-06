var gulp        = require('gulp');
var rename      = require('gulp-rename');
var babel       = require('gulp-babel');
var env         = require('babel-preset-env');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var postcss     = require('gulp-postcss');
var cssnano     = require('cssnano');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
var rimraf      = require('rimraf');
var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
    runSequence('clean', ['scripts', 'scripts-min', 'styles', 'styles-min'], cb);
});

gulp.task('clean', function(cb) {
    rimraf('dist', cb);
});

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'scripts',
                message: err.toString()
            }))
        }))
        .pipe(babel({
            'presets': [['env', {
                'targets': {
                    'browsers': ['>=5%', 'ie >= 10']
                }
            }]]
        }))
        .pipe(concat('ymaps-list.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts-min', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'scripts',
                message: err.toString()
            }))
        }))
        .pipe(babel({
            'presets': [['env', {
                'targets': {
                    'browsers': ['>=5%', 'ie >= 10']
                }
            }]]
        }))
        .pipe(concat('ymaps-list.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    return gulp.src('src/css/*.css')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'styles',
                message: err.toString()
            }))
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles-min', function() {
    return gulp.src('src/css/*.css')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'styles',
                message: err.toString()
            }))
        }))
        .pipe(postcss([
            cssnano({
                zindex: false,
                autoprefixer: true,
                reduceIdents: false
            })
        ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});