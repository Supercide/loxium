var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var del = require('del');
var rename = require("gulp-rename");
var gutil = require('gulp-util');

var tsProject = ts.createProject('tsconfig.json');
///////////////////////////////////////////////////////
// CLEAN                                             //
///////////////////////////////////////////////////////
gulp.task('clean:all', function () {
    return del([
      'dist/**/*',
      'lib/**/*',
    ]);
  });

///////////////////////////////////////////////////////
// PATCH                                             //
///////////////////////////////////////////////////////

gulp.task('patch', ['clean:all'], function () {
    let projectAction = function(project) {
            project.version = process.env.version || project.version
            return project;
        };

    patchProject(projectAction)
        .pipe(gulp.dest('./'));
});

gulp.task('compile', ['patch', 'clean:all'], function () {

    let tsResult = tsProject.src()
                            .pipe(tsProject());
    
    return tsResult.js.pipe(gulp.dest('lib'));
});

gulp.task('copy', ['compile', 'webpack'], function() {
    gulp.src('./types/loxium.d.ts')
        .pipe(gulp.dest('./lib/'))
})

gulp.task('webpack', ['compile'], function () {

        return gulp.src('./lib/loxium.js')
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(uglify())
            .pipe(rename(`loxium.min.js`))
            .pipe(gulp.dest(`dist/`));
    });

gulp.task('default', [ 'clean:all', 'patch', 'compile', 'webpack', 'copy' ]);

function patchProject(action) {
    let package = require('./package.json');

    package = action(package);

    let src = require('stream').Readable({ objectMode: true });

    src._read = function () {
      this.push(new gutil.File({
        cwd: "",
        base: "",
        path: "package.json",
        contents: new Buffer(JSON.stringify(package, null, 4))
      }));
      this.push(null);
    };

    return src
  }