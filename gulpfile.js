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
    connect = require('gulp-connect'),
    eslint = require('gulp-eslint');

// Object containing src and dist directory to use throughout tasks
const options = {
    src: "src",
    dist: "dist"
}

// Scripts task
gulp.task('scripts', ['lint'], () => {
    return gulp.src([options.src + '/js/global.js', options.src + '/js/circle/*'])
        .pipe(concat('app.js'))
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(options.dist + '/scripts'));
});

// Styles task
gulp.task('styles', () => {
    return gulp.src(options.src + '/sass/global.scss')
        .pipe(concat('all.min.css'))
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest(options.dist + '/styles'))
        .pipe(connect.reload());
});

// Images task
gulp.task('images', () => {
    return gulp.src(options.src + '/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(options.dist + '/content'));
});

// Delete all of the files and folders in the dist folder
gulp.task('clean', () => {
    del(options.dist + '/*');
});

// Serve task
gulp.task('serve', () => {
    return connect.server({
        root: options.dist,
        livereload: true
    });
});

// Lint task
gulp.task('lint', () => {
    return gulp.src([options.src + '/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.failAfterError());
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