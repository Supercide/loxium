var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var del = require('del');
var project = require('./package.json');
var rename = require("gulp-rename");

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

gulp.task('copy', ['compile', 'webpack'], function() {
    gulp.src('./types/loxium.d.ts')
        .pipe(gulp.dest('./lib/'))
})

gulp.task('webpack', ['compile'], function () {

        gulp.src('./lib/loxium.js')
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(uglify())
            .pipe(rename(`loxium-${project.version}.min.js`))
            .pipe(gulp.dest(`dist/`));
    });

gulp.task('default', [ 'clean:all', 'compile', 'webpack', 'copy' ]);