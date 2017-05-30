"use strict";

// Require modules
const gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect');

const options = {
    src: "src",
    dist: "dist"
}

// Scripts task
gulp.task('scripts', () => {
    return gulp.src([options.src + '/js/global.js', options.src + '/js/circle/*'])
        .pipe(concat('app.js'))
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/scripts'));
});

// Styles task
gulp.task('styles', () => {
    return gulp.src(options.src + '/sass/global.scss')
        .pipe(concat('all.min.css'))
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(connect.reload());
});

// Images task
gulp.task('images', () => {
    return gulp.src(options.src + '/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'));
});

// Delete all of the files and folders in the dist folder
gulp.task('clean', () => {
    del('dist/*');
});

gulp.task('serve', () => {
    return connect.server({
        root: 'dist',
        livereload: true
    });
});

// Build command with task dependencies, clean being first
gulp.task('build', ['clean', 'scripts', 'styles', 'images'], () => {
    return gulp.src([options.src + "/index.html", options.src + "/icons/**"], { base: options.src + '/' })
        .pipe(gulp.dest(options.dist));
});

// 'gulp' command runs the build task - listens for changes to Sass files and reloads browser
gulp.task('default', ['build', 'serve'], () => {
    gulp.watch(options.src + '/sass/**/*.scss', ['styles']);
});