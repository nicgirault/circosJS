var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('compile', ['jade2html', 'coffee2js', 'less2css']);