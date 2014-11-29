var gulp = require('gulp');
var parameters = require('./config/parameters.js');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var less = require('gulp-less');
var path = require('path');

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

gulp.task('compile', ['jade2html', 'coffee2js', 'less2css']);