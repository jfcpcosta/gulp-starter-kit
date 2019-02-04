"use strict";

const gulp = require("gulp");
const del = require("del");
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

/**
 * Compile SASS files
 */
gulp.task("sass", () => {
    return gulp.src("src/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("build"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.scss"])
        .pipe(gulp.dest("build"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    let libs = [
        'jquery/dist/jquery.min.js',
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap/dist/js/bootstrap.min.js',
        'animate.css/animate.min.css',
        'wowjs/dist/wow.min.js'
    ];

    return gulp
        .src(libs, {
            cwd: "node_modules/**"
        })
        .pipe(gulp.dest("build/lib"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task("watch", ["build"], () => {
    gulp.watch(["src/**/*.html", "src/**/*.css", "src/**/*.js"], ['resources']).on('change', (e) => {
        console.log('RESOURCE [' + e.path + ']');
    });
    gulp.watch(["src/**/*.scss"], ['sass']).on('change', (e) => {
        console.log('SASS [' + e.path + ']');
    });
});

/**
 * Build the project.
 */
gulp.task("build", ['sass', 'resources', 'libs'], () => {
    console.log("[ Building Project ]");
});