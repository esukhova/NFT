'use strict';

import gulp from 'gulp';
import *as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);
import  cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';
import minify from 'gulp-minify';
import imagemin from 'gulp-imagemin';
import autoprefixer from 'gulp-autoprefixer';
import ghPages from 'gulp-gh-pages';

gulp.task('css', function () {
    return gulp.src('./src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
    return gulp.src('./src/js/script.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('library', function () {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task('images', function () {
    return gulp.src('./public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/public/images'));
});

gulp.task('favicon', function () {
    return gulp.src('./public/favicon/*')
        .pipe(gulp.dest('./dist/public/favicon'));
});

gulp.task('icons', function () {
    return gulp.src('./public/icons/*')
        .pipe(gulp.dest('./dist/public/icons'));
});

gulp.task('fonts', function () {
    return gulp.src('./public/fonts/**/*')
        .pipe(gulp.dest('./dist/public/fonts'));
});


export const watch = function () {
    gulp.watch('./src/styles/*.scss', gulp.series('css'));
    gulp.watch('./src/js/*.js', gulp.series('js'));
    gulp.watch('./index.html', gulp.series('html'));
};


gulp.task('staticData', gulp.series('images', 'favicon', 'icons', 'fonts'));
gulp.task('srcData', gulp.series('css', 'js', 'html', 'library'));
gulp.task('default', gulp.series('srcData', 'staticData'));

gulp.task('deploy', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});