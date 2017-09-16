var gulp = require('gulp');
var ts = require('gulp-typescript');
var fs = require('fs');
var source = require('vinyl-source-stream');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('precompile', function () {
    let tsResult = tsProject.src()
                            .pipe(tsProject());

    return tsResult.js
                   .pipe(gulp.dest('lib'));
});

gulp.task('default', [ 'precompile' ]);