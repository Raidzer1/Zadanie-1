'use strict';

const gulp = require('gulp'),
    connect = require('gulp-connect');
const sass = require('gulp-sass');
const replace = require('gulp-string-replace');
sass.compiler = require('node-sass');

gulp.task('connect', function(done) {
    connect.server({
        root: './',
        livereload: true
    });
    done()
});

gulp.task('html', function (done) {
    gulp.src('./*.html')
        .pipe(replace(new RegExp ('dist/css/', 'g'), 'css/'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
    done();
});

gulp.task('html:watch', function (done) {
    gulp.watch(['./*.html'], gulp.series(['html']));
    done()
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(replace(new RegExp ('../../layout/', 'g'), '../layout/'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function (done) {
    gulp.watch('./src/scss/**/*.scss', gulp.series(['sass']));
    done()
});

gulp.task('copy', function (done) {
    gulp.src('./layout/*')
        .pipe(gulp.dest('./dist/layout/'));
    done()
});


gulp.task('watch', gulp.parallel(['sass', 'html', 'copy', 'sass:watch', 'connect', 'html:watch'] ,function(done) {
    done()
}));

gulp.task('build', gulp.series(['sass', 'html', 'copy'] ,function(done) {
    done()
}));
