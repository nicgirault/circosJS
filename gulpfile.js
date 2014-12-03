var gulp = require('gulp');
var parameters = require('./config/parameters.js');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var less = require('gulp-less');
var path = require('path');
var copy = require('gulp-copy');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');

gulp.task('default', function() {
  // place code for your default task here
  var test = null;
});

gulp.task('coffee2js', function(){
    gulp.src(parameters.app_path + '/**/*.coffee')
        .pipe(coffee({bare: true}))
        .pipe(concat(parameters.app_main_file))
        .pipe(gulp.dest(parameters.web_path + '/js'))
        .on('error', gutil.log);
});

gulp.task('jade2html', function(){
    gulp.src(parameters.app_path + '/**/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(parameters.web_path))
        .on('error', gutil.log);
});

gulp.task('less2css', function(){
    gulp.src(parameters.app_path + '/**/*.less')
        .pipe(less({paths: [ path.join(__dirname) ]}))
        .pipe(gulp.dest(parameters.web_path + '/css'))
        .on('error', gutil.log);
});

gulp.task('copy', function(){
    gulp.src(parameters.app_path + '/**/*.js')
        .pipe(copy(parameters.web_path + '/js', {prefix: 1}))
        .on('error', gutil.log);

    gulp.src('node_modules/d3/d3.min.js')
        .pipe(copy(parameters.web_path + '/js', {prefix: 2}))
        .on('error', gutil.log);
    gulp.src(parameters.app_path + '/vendor/colorBrewer/colorBrewer.css')
        .pipe(copy(parameters.web_path + '/css', {prefix: 3}))
        .on('error', gutil.log);
});

gulp.task('mocha', function () {
    gulp.src('test/test.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function () {
    gulp.watch(parameters.app_path + '/**/*.coffee', ['coffee2js']);
    gulp.watch(parameters.app_path + '/**/*.jade', ['jade2html']);
    gulp.watch(parameters.app_path + '/**/*.less', ['less2css']);
});

gulp.task('compile', ['jade2html', 'coffee2js', 'less2css', 'copy']);