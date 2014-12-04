var gulp = require('gulp');
var parameters = require('./config/parameters.js');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var less = require('gulp-less');
var path = require('path');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');

gulp.task('default', function() {
  // place code for your default task here
  var test = null;
});

gulp.task('coffee2js-concat', function(){
    gulp.src(
        [
            'src/circos.coffee',
            'src/layout.coffee',
        ])
        .pipe(coffee({bare: true}))
        .pipe(concat('circosJS.js'))
        .pipe(gulp.dest('dist'))
        .on('error', gutil.log);
});

gulp.task('js-full', ['coffee2js-concat'], function(){
    gulp.src(
        [
            'src/vendor/d3/d3.min.js',
            'dist/circosJS.js',
        ])
        .pipe(concat('circosJS.full.js'))
        .pipe(gulp.dest('dist'))
        .on('error', gutil.log);
});

gulp.task('css-full', ['less2css'], function(){
    gulp.src(
        [
            'src/vendor/colorBrewer/colorBrewer.css',
            'dist/circosJS.css',
        ])
        .pipe(concat('circosJS.full.css'))
        .pipe(gulp.dest('dist'))
        .on('error', gutil.log);
});

gulp.task('less2css', function(){
    gulp.src(['src/circosJS.less'])
        .pipe(less('circosJS.css'))
        .pipe(gulp.dest('dist'))
        .on('error', gutil.log);
});

gulp.task('mocha', function () {
    gulp.src('test/test.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function () {
    gulp.watch(parameters.app_path + '/**/*.coffee', ['js-full']);
    gulp.watch(parameters.app_path + '/**/*.less', ['css-full']);
});

