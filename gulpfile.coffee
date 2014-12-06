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

gulp.task 'concat-coffee', ->
    gulp.src [
        'src/circos.coffee'
        'src/layout.coffee'
        'src/heatmap.coffee'
        'src/render.coffee'
        'src/default_parameters.coffee'
    ]
    .pipe(concat('circosJS.coffee'))
    .pipe(gulp.dest('src'))
    .on 'error', gutil.log
    return

gulp.task 'coffee2js', ['concat-coffee'], ->
    gulp.src 'src/circosJS.coffee'
    .pipe(coffee(bare: true))
    .pipe(concat('circosJS.js'))
    .pipe(gulp.dest('dist'))
    .on 'error', gutil.log
    return

gulp.task 'test', ['concat-coffee'], ->
    setTimeout ->
        gulp.src 'test/test.coffee', {read: false}
        .pipe mocha {reporter: 'nyan', compilers: 'coffee:coffee-script'}
        .on 'error', gutil.log
        return
    , 1000

gulp.task 'watch', ->
    gulp.watch 'src/*.coffee', ['coffee2js']
    # gulp.watch 'src/*.less', ['css-full']
    return
# gulp.task 'requirejsBuild', ['coffee2js'], ->
#     rjs
#         name: 'circos.js'
#         baseUrl: './src/'
#         out: './src/circosJS.js'
#     .pipe(gulp.dest('./dist/'))
#     .on "error", gutil.log
#     return

# gulp.task "js-full", ["compile-js"], ->
#     gulp.src([
#         "src/vendor/d3/d3.min.js"
#         "dist/circosJS.js"
#     ]).pipe(concat("circosJS.full.js")).pipe(gulp.dest("dist")).on "error", gutil.log
#     return

# gulp.task "css-full", ["less2css"], ->
#     gulp.src([
#         "src/vendor/colorBrewer/colorBrewer.css"
#         "dist/circosJS.css"
#     ]).pipe(concat("circosJS.full.css")).pipe(gulp.dest("dist")).on "error", gutil.log
#     return

# gulp.task 'less2css', ->
#     gulp.src ['src/circosJS.less']
#     .pipe less 'circosJS.css'
#     .pipe gulp.dest 'dist'
#     .on 'error', gutil.log
#     return


# gulp.task 'md_test', ->
#     gulp.src ['./src/md_layout.coffee', './src/md_rendering.coffee','./src/md_circos.coffee']
#     .pipe concat 'md_circosJS.coffee'
#     .pipe coffee(bare: true)
#     .pipe(gulp.dest('dist'))
#     .on "error", gutil.log



# gulp.task 'default', ['watch']
