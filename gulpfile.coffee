# Load needed libraries
gulp = require("gulp")
coffee = require("gulp-coffee")
concat = require("gulp-concat")
gutil = require("gulp-util")
less = require("gulp-less")
path = require("path")
mocha = require("gulp-mocha")
watch = require("gulp-watch")
# rjs = require('gulp-requirejs')

gulp.task 'coffee', ->
    gulp.src [
        'src/circos.coffee'
        'src/dataParser.coffee'
        'src/layout.coffee'
        'src/tracks.coffee'
        'src/tracks/*.coffee'
        'src/rendering/*.coffee'
        'src/render.coffee'
        'src/defaultParameters.coffee'
    ]
    .pipe(concat('circosJS.coffee'))
    .pipe(coffee(bare: true))
    .pipe(concat('circosJS.js'))
    .pipe(gulp.dest('dist'))
    .on 'error', gutil.log

gulp.task 'build', ['coffee']

gulp.task 'watch', ['build'], ->
    gulp.watch 'src/**/*.coffee', ['coffee']
