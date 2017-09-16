var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('precompile', function () {

    let tsResult = tsProject.src()
                            .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('lib'));
});

gulp.task('default', [ 'precompile' ]);