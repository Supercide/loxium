var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var del = require('del');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean:all', function () {
    return del([
      'dist/**/*',
      'lib/**/*',
    ]);
  });

gulp.task('compile', ['clean:all'], function () {

    let tsResult = tsProject.src()
                            .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('lib'));
});

gulp.task('webpack', ['compile'], function () {

        gulp.src('./lib/loxium.js')
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
    });

gulp.task('default', [ 'clean:all', 'compile', 'webpack' ]);